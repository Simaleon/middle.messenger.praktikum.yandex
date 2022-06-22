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
        <div class="auth-page login">
            <form class="auth-form">
                <div class="top">
                    <h1>Вход</h1>
                    <custom-input name="login" class="login" placeholder="Логин" error="Неверный логин"></custom-input>
                    <custom-input name="password" class="password" type="password" placeholder="Пароль" error="Неверный пароль"></custom-input>
                </div>
                <div class="actions">
                    <main-button class="blue" text="Войти" @click="btnClick" type="button"></main-button>
                    <a href="/registration.html" class="link">Нет аккаунта?</a>
                </div>
            </form>
        </div>
    `
};