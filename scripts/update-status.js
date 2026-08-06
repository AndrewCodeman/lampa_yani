const fs = require('fs');
const path = require('path');

const STATUS_BASE = 'https://yummystatus.me';
const MAX_BUCKETS = 90;
const PERIODS = {
    '3hour': {bucketMs: 2 * 60 * 1000},
    day: {bucketMs: 16 * 60 * 1000},
    week: {bucketMs: 2 * 60 * 60 * 1000},
    month: {bucketMs: 8 * 60 * 60 * 1000}
};
const LABELS = {
    'old.yummyani.me': 'Старый сайт',
    'old.yummy-ani.me': 'Старый сайт (зеркало)',
    'ru.yummyani.me': 'Новый сайт',
    'ru.yummy-ani.me': 'Новый сайт (зеркало)',
    'api.yani.tv': 'YummyAnime API',
    'waf.valtrix.org': 'Защита'
};

async function getJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
        const response = await fetch(url, {signal: controller.signal});
        if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
        return response.json();
    } finally {
        clearTimeout(timer);
    }
}

function isUp(code) {
    return Number(code) >= 200 && Number(code) < 400;
}

function average(values) {
    const usable = values.map(Number).filter(Number.isFinite);
    return usable.length ? Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length) : 0;
}

function bucketTime(value, bucketMs) {
    return Math.floor(new Date(value).getTime() / bucketMs) * bucketMs;
}

function aggregateHttp(records, pingRecords, period) {
    const bucketMs = PERIODS[period].bucketMs;
    const byDomain = new Map();

    records.forEach((record) => {
        if (!byDomain.has(record.domain)) byDomain.set(record.domain, []);
        byDomain.get(record.domain).push(record);
    });

    const domains = Array.from(byDomain.entries()).map(([domain, domainRecords]) => {
        const buckets = new Map();
        domainRecords.forEach((record) => {
            const time = bucketTime(record.created_at, bucketMs);
            if (!buckets.has(time)) buckets.set(time, []);
            buckets.get(time).push(record);
        });

        const history = Array.from(buckets.entries()).sort((a, b) => a[0] - b[0]).slice(-MAX_BUCKETS).map(([time, items]) => {
            const up = items.filter((item) => isUp(item.status_code)).length;
            return {
                time: new Date(time).toISOString(),
                status: up === items.length ? 'up' : up === 0 ? 'down' : 'degraded',
                average_ms: average(items.map((item) => item.total_time)),
                checks: items.length,
                failed: items.length - up
            };
        });

        const domainPings = pingRecords.filter((record) => record.domain === domain);
        const latest = history[history.length - 1] || {status: 'unknown', average_ms: 0};
        const upCount = domainRecords.filter((record) => isUp(record.status_code)).length;

        return {
            domain,
            label: LABELS[domain] || domain,
            status: latest.status,
            average_ms: average(domainRecords.map((record) => record.total_time)),
            ping_ms: average(domainPings.map((record) => record.rtt_avg)),
            packet_loss: average(domainPings.map((record) => record.packet_loss)),
            checks: domainRecords.length,
            failed: domainRecords.length - upCount,
            history
        };
    }).sort((a, b) => Object.keys(LABELS).indexOf(a.domain) - Object.keys(LABELS).indexOf(b.domain));

    const current = domains.map((domain) => domain.status);
    const failed = records.filter((record) => !isUp(record.status_code)).length;
    const status = current.length && current.every((value) => value === 'up')
        ? 'up'
        : current.length && current.every((value) => value === 'down')
            ? 'down'
            : 'degraded';

    return {
        generated_at: new Date().toISOString(),
        period,
        source: `${STATUS_BASE}/`,
        summary: {
            status,
            checks: records.length,
            failed,
            uptime_percent: records.length ? Number((((records.length - failed) / records.length) * 100).toFixed(1)) : 0,
            average_ms: average(records.map((record) => record.total_time))
        },
        domains
    };
}

async function main() {
    const entries = await Promise.all(Object.keys(PERIODS).map(async (period) => {
        const [httpRecords, pingRecords] = await Promise.all([
            getJson(`${STATUS_BASE}/http-logs?timeRange=${period}`),
            getJson(`${STATUS_BASE}/ping-logs?timeRange=${period}`)
        ]);
        if (!Array.isArray(httpRecords) || !httpRecords.length) throw new Error(`YummyStatus returned no HTTP measurements for ${period}`);
        return [period, aggregateHttp(httpRecords, Array.isArray(pingRecords) ? pingRecords : [], period)];
    }));
    const periods = Object.fromEntries(entries);
    const output = {
        generated_at: new Date().toISOString(),
        source: `${STATUS_BASE}/`,
        default_period: '3hour',
        periods
    };
    const target = path.join(__dirname, '..', 'status', 'status.json');
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.writeFileSync(target, JSON.stringify(output));
    console.log(`Created ${target}: ${Object.keys(periods).join(', ')}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
