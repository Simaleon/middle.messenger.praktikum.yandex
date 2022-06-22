import './registration.less';
import input from '../components/input/input';
import button from "../../../components/button/button";

export default {
    components: {
        'custom-input': input,
        'main-button': button
    },
    template: `
        <div class="auth-page registration">
            <form class="auth-form">
                <div class="top">
                    <h1>Регистрация</h1>
                    <custom-input name="email" class="input" rype="email" placeholder="Почта" error="Пользователь с таким email уже зарегистрирован"></custom-input>
                    <custom-input name="login" class="input" placeholder="Логин" error="Такой логин уже существует"></custom-input>
                    <custom-input name="first_name" class="input" placeholder="Имя"></custom-input>
                    <custom-input name="second_name" class="input" placeholder="Фамилия"></custom-input>
                    <custom-input name="phone" class="input" type="phone" placeholder="Телефон" error="Пользователь с таким телефоном уже зарегистрирован"></custom-input>
                    <custom-input name="password" class="input" type="password" placeholder="Пароль"></custom-input>
                    <custom-input class="input" type="password" placeholder="Повторите пароль" error="Пароли не совпадают"></custom-input>
                </div>
                <div class="actions">
                    <main-button class="blue" text="Зарегистрироваться"></main-button>
                    <a href="/index.html" class="link">Войти</a>
                </div>
            </form>
        </div>
    `
};