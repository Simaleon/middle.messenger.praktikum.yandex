import Component from "../../../templator/Component";

import './change.less';
import button from "../../../components/button/Button";
import Validator from "../../../Validator";
import { firstPasswordValidation, onInvalid, onValid, secondPasswordValidation } from "../../../validation";
import Input from "../../../components/input/Input";

export default class ChangePassword extends Component {
    components() {
        return {
            'custom-button': button,
            'custom-input': Input
        }
    }

    data() {
        return {
            dataList: [
                {
                    property: 'Старый пароль',
                    value: 'badpass',
                    name: 'old_password'
                },
                {
                    property: 'Новый пароль',
                    value: 'newsupermegapass',
                    name: 'password',
                    error: 'Неверный формат пароля'
                },
                {
                    property: 'Повторите новый пароль',
                    value: 'newsupermegapass',
                    name: 'password_2',
                    error: 'Пароли не совпадают'
                }
            ]
        }
    }

    methods() {
        return {
            submit(evt: SubmitEvent) {
                const formData = new FormData(evt.target as HTMLFormElement);
                console.log(...formData);
                evt.preventDefault();
            }
        };
    }

    componentDidMount() {
        new Validator(this.element(), {
            fields: {
                password: firstPasswordValidation,
                password_2: secondPasswordValidation
            },
            onValid: onValid,
            onInvalid: onInvalid
        });
    }

    template() {
        return `
        <form class="change-data" @submit="submit">
            <div for="item in dataList" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <custom-input class="change-data__input input_no-placeholder" type="password" :value="item.value" :name="item.name" :error="item.error"></custom-input>
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </form>
    `;
    }
}
