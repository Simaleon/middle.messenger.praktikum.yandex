import Component from "../../../templator/Component";
import Validator from "../../../Validator";

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

    componentDidMount() {
        new Validator(this.element().getElementsByTagName('form')[0], {
            fields: {
                email: '^\\S+@\\S+\\.\\S+$',
                phone: '^[\\+0-9][0-9]{9,14}$',
                first_name: '^[A-ZА-Я][a-zа-я-]+$',
                second_name: '^[A-ZА-Я][a-zа-я-]+$',
                login: '(?!^\\d+$)^[A-ZА-Яa-zа-я][a-zа-я-_0-9]{2,}$',
                password: (form: HTMLElement, value: string): boolean => {
                    const psw_2: HTMLInputElement | null = form.querySelector(`[name="password_2"]`);

                    if(psw_2) {
                        return !!value && new RegExp('^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,40})$').test(value) && psw_2.value === value;
                    } else {
                        throw new Error('Password 2 doesn\'t exists');
                    }
                },
                password_2: (form: HTMLElement, value: string): boolean => {
                    const psw: HTMLInputElement | null = form.querySelector(`[name="password"]`);

                    if(psw) {
                        return !!value && psw.value === value;
                    } else {
                        throw new Error('Password doesn\'t exists');
                    }
                },
            },
            onValid(field) {
                const element = field.closest('.auth-input');

                if(element) {
                    element.classList.remove('auth-input_has-error');
                }
            },
            onInvalid(field) {
                const element = field.closest('.auth-input');

                if(element) {
                    element.classList.add('auth-input_has-error');
                }
            }
        });
    }

    protected methods(): Record<string, (...args: any) => (any | void)> {
        return {
            submit(evt) {
                const formData = new FormData(evt.target);
                console.log(...formData);
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
                    <custom-input name="login" class="auth-page__input" placeholder="Логин" error="Такой логин уже существует"></custom-input>
                    <custom-input name="first_name" class="auth-page__input" placeholder="Имя"></custom-input>
                    <custom-input name="second_name" class="auth-page__input" placeholder="Фамилия"></custom-input>
                    <custom-input name="phone" class="auth-page__input" type="phone" placeholder="Телефон" error="Некорректный формат телефона"></custom-input>
                    <custom-input name="password" class="auth-page__input" type="password" placeholder="Пароль"></custom-input>
                    <custom-input name="password_2" class="auth-page__input" type="password" placeholder="Повторите пароль" error="Пароли не совпадают"></custom-input>
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
