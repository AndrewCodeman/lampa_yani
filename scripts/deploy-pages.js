const fs = require('fs');

const API_BASE = (process.env.GITHUB_API_URL || 'https://api.github.com').replace(/\/$/, '');
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const RUN_ID = process.env.GITHUB_RUN_ID;
const TOKEN = process.env.GITHUB_TOKEN;
const ARTIFACT_NAME = process.env.PAGES_ARTIFACT_NAME || 'github-pages';
const MAX_WAIT_MS = Number(process.env.PAGES_DEPLOY_TIMEOUT_MS || 30 * 60 * 1000);
const POLL_INTERVAL_MS = Number(process.env.PAGES_DEPLOY_POLL_MS || 5000);

function requireValue(name, value) {
    if (!value) throw new Error(`${name} is not available in the GitHub Actions environment`);
    return value;
}

function apiUrl(path) {
    return `${API_BASE}${path}`;
}

function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function requestJson(path, options = {}) {
    const response = await fetch(apiUrl(path), {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.headers || {})
        }
    });
    const text = await response.text();
    let body;

    try {
        body = text ? JSON.parse(text) : null;
    } catch {
        body = text;
    }

    if (!response.ok) {
        const message = body && typeof body === 'object' && body.message ? body.message : text;
        throw new Error(`GitHub API ${response.status} ${response.statusText}: ${message}`);
    }

    return body;
}

async function getArtifactId() {
    const artifacts = await requestJson(`/repos/${REPOSITORY}/actions/runs/${RUN_ID}/artifacts?per_page=100`);
    const matches = (artifacts.artifacts || []).filter((artifact) => artifact.name === ARTIFACT_NAME);

    if (matches.length !== 1) {
        throw new Error(`Expected exactly one artifact named "${ARTIFACT_NAME}", found ${matches.length}`);
    }

    console.log(`Found artifact "${ARTIFACT_NAME}" with ID ${matches[0].id}`);
    return matches[0].id;
}

async function getOidcToken() {
    const requestUrl = requireValue('ACTIONS_ID_TOKEN_REQUEST_URL', process.env.ACTIONS_ID_TOKEN_REQUEST_URL);
    const requestToken = requireValue('ACTIONS_ID_TOKEN_REQUEST_TOKEN', process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN);
    const response = await fetch(requestUrl, {
        headers: {Authorization: `bearer ${requestToken}`}
    });

    if (!response.ok) throw new Error(`OIDC token request failed with HTTP ${response.status}`);
    const body = await response.json();
    return requireValue('OIDC token', body.value);
}

function setOutput(name, value) {
    const outputFile = process.env.GITHUB_OUTPUT;
    if (!outputFile) return;
    fs.appendFileSync(outputFile, `${name}<<__YUMMYANIME_OUTPUT__\n${value}\n__YUMMYANIME_OUTPUT__\n`);
}

async function cancelDeployment(deploymentId) {
    try {
        await requestJson(`/repos/${REPOSITORY}/pages/deployments/${deploymentId}/cancel`, {method: 'POST'});
        console.log(`Canceled Pages deployment ${deploymentId}`);
    } catch (error) {
        console.warn(`Unable to cancel Pages deployment ${deploymentId}: ${error.message}`);
    }
}

async function main() {
    requireValue('GITHUB_REPOSITORY', REPOSITORY);
    requireValue('GITHUB_RUN_ID', RUN_ID);
    requireValue('GITHUB_TOKEN', TOKEN);

    const artifactId = await getArtifactId();
    const oidcToken = await getOidcToken();
    const deployment = await requestJson(`/repos/${REPOSITORY}/pages/deployments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            artifact_id: artifactId,
            pages_build_version: process.env.GITHUB_SHA,
            oidc_token: oidcToken
        })
    });
    const deploymentId = deployment.id || deployment.status_url?.split('/').pop();
    requireValue('Pages deployment ID', deploymentId);
    console.log(`Created Pages deployment ${deploymentId}`);

    const deadline = Date.now() + MAX_WAIT_MS;
    let latestStatus = deployment.status || 'queued';

    while (Date.now() < deadline) {
        await delay(POLL_INTERVAL_MS);
        const current = await requestJson(`/repos/${REPOSITORY}/pages/deployments/${deploymentId}`);
        latestStatus = current.status || 'unknown';
        console.log(`Current Pages deployment status: ${latestStatus}`);

        if (latestStatus === 'succeed') {
            setOutput('page_url', current.page_url || deployment.page_url || '');
            console.log('Pages deployment completed successfully');
            return;
        }

        if (['deployment_failed', 'deployment_perms_error', 'deployment_content_failed', 'deployment_cancelled', 'deployment_lost'].includes(latestStatus)) {
            throw new Error(`Pages deployment failed with status: ${latestStatus}`);
        }
    }

    await cancelDeployment(deploymentId);
    throw new Error(`Pages deployment timed out after ${MAX_WAIT_MS}ms; last status: ${latestStatus}`);
}

main().catch((error) => {
    console.error(error.stack || error);
    process.exitCode = 1;
});
