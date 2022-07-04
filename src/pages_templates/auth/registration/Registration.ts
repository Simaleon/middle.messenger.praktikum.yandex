import Component from "../../../templator/Component";

import './registration.less';
import input from '../components/input/Input';
import button from "../../../components/button/Button";

export default class Registration extends Component {
    components() {
        return {
            'custom-input': input,
            'main-button': button
        }
    }
    template() {
        return `
        <div class="auth-page auth-page_registration">
            <form class="auth-page__auth-form">
                <div>
                    <h1 class="auth-page__header">Регистрация</h1>
                    <custom-input name="email" class="auth-page__input" rype="email" placeholder="Почта" error="Пользователь с таким email уже зарегистрирован"></custom-input>
                    <custom-input name="login" class="auth-page__input" placeholder="Логин" error="Такой логин уже существует"></custom-input>
                    <custom-input name="first_name" class="auth-page__input" placeholder="Имя"></custom-input>
                    <custom-input name="second_name" class="auth-page__input" placeholder="Фамилия"></custom-input>
                    <custom-input name="phone" class="auth-page__input" type="phone" placeholder="Телефон" error="Пользователь с таким телефоном уже зарегистрирован"></custom-input>
                    <custom-input name="password" class="auth-page__input" type="password" placeholder="Пароль"></custom-input>
                    <custom-input class="auth-page__input" type="password" placeholder="Повторите пароль" error="Пароли не совпадают"></custom-input>
                </div>
                <div>
                    <main-button class="auth-page__button button_blue" text="Зарегистрироваться"></main-button>
                    <a href="/index.html" class="auth-page__link">Войти</a>
                </div>
            </form>
        </div>
    `;
    }
}
