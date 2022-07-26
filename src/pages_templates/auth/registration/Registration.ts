import Component from "../../../templator/Component";
import Validator, { emailRegExp, phoneRegExp, nameRegExp, loginRegExp, passwordRegExp } from "../../../Validator";
import { onInvalid, onValid, secondPasswordValidation } from "../../../validation";
import './registration.less';
import input from '../../../components/input/Input';
import button from "../../../components/button/Button";
import AuthController from "../../../controllers/AuthController";

export default class Registration extends Component {
    components() {
        return {
            'custom-input': input,
            'main-button': button
        }
    }

    componentDidMount() {
        new Validator(this.element().getElementsByTagName('form')[0], {
            fields: {
                email: emailRegExp,
                phone: phoneRegExp,
                first_name: nameRegExp,
                second_name: nameRegExp,
                login: loginRegExp,
                password: passwordRegExp,
                password_2: secondPasswordValidation
            },
            onValid: onValid,
            onInvalid: onInvalid
        });
    }

    methods() {
        return {
            submit(evt: Event) {
                evt.preventDefault();

                AuthController.signup(new FormData(evt.target as HTMLFormElement));
            }
        }
    }

    template() {
        return `
        <div class="auth-page auth-page_registration">
            <form class="auth-page__auth-form" @submit="submit">
                <div>
                    <h1 class="auth-page__header">Регистрация</h1>
                    <custom-input name="email" class="auth-page__input" type="email" placeholder="Почта" error="Некорректный email"></custom-input>
                    <custom-input name="login" class="auth-page__input" placeholder="Логин" error="Некорректный логин"></custom-input>
                    <custom-input name="first_name" class="auth-page__input" placeholder="Имя" error="Некорректное имя"></custom-input>
                    <custom-input name="second_name" class="auth-page__input" placeholder="Фамилия" error="Некорректная фамилия"></custom-input>
                    <custom-input name="phone" class="auth-page__input" type="phone" placeholder="Телефон" error="Некорректный формат телефона"></custom-input>
                    <custom-input name="password" class="auth-page__input" type="password" placeholder="Пароль" error="Неверный формат пароля"></custom-input>
                    <custom-input name="password_2" class="auth-page__input" type="password" placeholder="Повторите пароль" error="Пароли не совпадают"></custom-input>
                </div>
                <div>
                    <main-button class="auth-page__button button_blue" text="Зарегистрироваться"></main-button>
                    <a href="/" class="auth-page__link">Войти</a>
                </div>
            </form>
        </div>
    `;
    }
}
