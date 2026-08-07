(function (window) {
    'use strict';
    function create(object, deps) {
        var scroll = new Lampa.Scroll({mask: true, over: true, step: 250}), html = $('<div class="yani-auth"></div>'), content = $('<div class="yani-auth__content"></div>'), login = (LampaYaniAuth.get().login || '').trim(), password = '', last;
        scroll.minus();
        function focus(element) { element.on('hover:focus', function (event) { var target = event.currentTarget || event.target; last = target; scroll.update($(target), true); }); return element; }
        function render() {
            content.empty(); var account = LampaYaniAuth.get(), authorized = Boolean(LampaYaniAuth.token());
            content.append($('<div class="yani-auth__title"></div>').text(deps.t('auth_title'))).append($('<div class="yani-auth__status ' + (authorized ? 'is-authorized' : '') + '"></div>').text(authorized ? deps.t('auth_authorized') : deps.t('auth_not_authorized')));
            var form = $('<div class="yani-auth__form"></div>');
            field(form, deps.t('auth_login'), login || deps.t('auth_login_empty'), function () { deps.input({title: deps.t('email_prompt'), value: login, nosave: true, align: 'center'}, function (value) { login = String(value || '').trim(); render(); }); });
            field(form, deps.t('auth_password'), password ? '••••••••' : deps.t('auth_password_empty'), function () { deps.input({title: deps.t('password_prompt'), value: '', password: true, nosave: true, align: 'center'}, function (value) { password = String(value || ''); render(); }); });
            content.append(form); var actions = $('<div class="yani-auth__actions"></div>');
            if (!authorized) action(actions, deps.t('auth_submit'), 'primary', submit); else { action(actions, deps.t('refresh_name'), '', refresh); action(actions, deps.t('logout_name'), '', logout); }
            content.append(actions); if (authorized && account.login) content.append($('<div class="yani-auth__account"></div>').text(deps.t('auth_account') + ': ' + account.login)); content.append($('<div class="yani-auth__hint"></div>').text(deps.t('auth_hint')));
        }
        function field(parent, title, value, handler) { var item = focus($('<div class="yani-auth__field selector"></div>')); item.append($('<div class="yani-auth__field-title"></div>').text(title), $('<div class="yani-auth__field-value"></div>').text(value)); item.on('hover:enter', handler); parent.append(item); }
        function action(parent, title, kind, handler) { var item = focus($('<div class="yani-auth__button selector ' + (kind ? 'yani-auth__button--' + kind : '') + '"></div>').text(title)); item.on('hover:enter', handler); parent.append(item); }
        function submit() {
            if (!login) return Lampa.Noty.show(deps.t('email_required')); if (!password) return Lampa.Noty.show(deps.t('password_required'));
            Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start();
            LampaYaniAuth.login(login, password).then(function () { return LampaYaniApi.profile().then(function (payload) { var profile = payload && payload.response ? payload.response : payload, current = LampaYaniAuth.get(); LampaYaniAuth.save({token: current.token, login: current.login, display_name: profile && (profile.nickname || profile.name) || current.login}); }).catch(function () {}); }).then(function () { password = ''; Lampa.Noty.show(deps.t('login_ok')); deps.goBack(); }).catch(function (error) { console.error('[YummyAnime Auth]', error); Lampa.Noty.show(deps.t('login_error')); }).then(function () { Lampa.Loading && Lampa.Loading.stop && Lampa.Loading.stop(); });
        }
        function refresh() { LampaYaniAuth.refresh().then(function () { Lampa.Noty.show(deps.t('token_refreshed')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_refresh_error')); }); }
        function logout() { LampaYaniAuth.logout().then(function () { Lampa.Noty.show(deps.t('logged_out')); render(); }).catch(function () { Lampa.Noty.show(deps.t('token_removed')); render(); }); }
        return {create: function () { render(); scroll.append(content); html.append(scroll.render(true)); this.activity.loader(false); this.activity.toggle(); }, start: function () { Lampa.Controller.add('content', {toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(last || false, scroll.render()); }, left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); }, right: function () { Navigator.move('right'); }, up: function () { if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head'); }, down: function () { LampaYaniNavigation.moveDown(scroll); }, back: deps.goBack}); Lampa.Controller.toggle('content'); }, render: function (js) { return js ? html[0] : html; }, destroy: function () { scroll.destroy(); html.remove(); }};
    }
    window.LampaYani = window.LampaYani || {};
    window.LampaYani.AuthPage = window.LampaYaniAuthPage = {create: create};
}(window));
