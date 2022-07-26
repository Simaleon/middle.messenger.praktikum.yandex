import Router from "../router/Router";
import Login from "../pages_templates/auth/login/Login";
import Registration from "../pages_templates/auth/registration/Registration";
import Chat from "../pages_templates/chat/Chat";
import Profile from "../pages_templates/profile/Profile";
import ErrorPage from "../pages_templates/error/Error";

Router.use('/', Login);
Router.use('/sign-up', Registration);
Router.use('/messenger', Chat);
Router.use('/settings', Profile);
Router.use('/settings/edit', Profile, { blockProperties: { mode: 'changeData' } });
Router.use('/settings/editpsw', Profile, { blockProperties: { mode: 'profilePass' } });
Router.use('/error404', ErrorPage, { blockProperties: { number: 404, text: 'Не туда попали' } });
Router.use('/error500', ErrorPage, { blockProperties: { number: 500, text: 'Мы уже фиксим' } });

Router.start();