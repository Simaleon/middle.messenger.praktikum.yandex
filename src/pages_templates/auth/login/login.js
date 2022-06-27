import './login.less';
import input from '../components/input/input';
import button from "../../../components/button/button";

export default {
    components: {
        'custom-input': input,
        'main-button': button
    },
    methods: {
        btnClick() {
            location.href='/chat.html';
        }
    },
    template: `
        <div class="auth-page auth-page_login">
            <form class="auth-page__auth-form">
                <div>
                    <h1 class="auth-page__header">Вход</h1>
                    <custom-input name="login" class="auth-page__login" placeholder="Логин" error="Неверный логин"></custom-input>
                    <custom-input name="password" class="auth-page__password" type="password" placeholder="Пароль" error="Неверный пароль"></custom-input>
                </div>
                <div>
                    <main-button class="auth-page__button button_blue" text="Войти" @click="btnClick" type="button"></main-button>
                    <a href="/registration.html" class="auth-page__link">Нет аккаунта?</a>
                </div>
            </form>
        </div>
    `
};