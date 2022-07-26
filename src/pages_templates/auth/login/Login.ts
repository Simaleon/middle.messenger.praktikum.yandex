import Component from "../../../templator/Component";

import './login.less';
import input from '../../../components/input/Input';
import button from "../../../components/button/Button";
import AuthController from "../../../controllers/AuthController";

export default class Login extends Component {
    components() {
        return {
            'custom-input': input,
            'main-button': button
        }
    }
    methods() {
        return {
            submit(evt: Event) {
                evt.preventDefault();

                AuthController.signin(new FormData(evt.target as HTMLFormElement));
            }
        }
    }

    template() {
        return `
        <div class="auth-page auth-page_login">
            <form class="auth-page__auth-form" @submit="submit">
                <div>
                    <h1 class="auth-page__header">Вход</h1>
                    <custom-input name="login" class="auth-page__login" placeholder="Логин" error="Неверный логин"></custom-input>
                    <custom-input name="password" class="auth-page__password" type="password" placeholder="Пароль" error="Неверный пароль"></custom-input>
                </div>
                <div>
                    <main-button class="auth-page__button button_blue" text="Войти" @click="btnClick"></main-button>
                    <a href="/sign-up" class="auth-page__link">Нет аккаунта?</a>
                </div>
            </form>
        </div>
    `;
    }
}
