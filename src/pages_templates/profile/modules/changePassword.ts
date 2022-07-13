import Component from "../../../templator/Component";

import './change.less';
import button from "../../../components/button/Button";
import Validator from "../../../Validator";

export default class ChangePassword extends Component {
    components() {
        return {
            'custom-button': button
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
                    name: 'password'
                },
                {
                    property: 'Повторите новый пароль',
                    value: 'newsupermegapass',
                    name: 'password_2'
                }
            ]
        }
    }

    protected methods(): Record<string, (...args: any) => (any | void)> {
        return {
            submit(evt: SubmitEvent) {
                const formData = new FormData(evt.target as HTMLFormElement);
                console.log(...formData);
                evt.preventDefault();
            }
        };
    }

    componentDidMount() {
        new Validator(this.element().getElementsByTagName('form')[0], {
            fields: {
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

    template() {
        return `
        <form class="change-data" @submit="submit">
            <div for="item in dataList" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <input class="change-data__input" type="password" :value="item.value" :name="item.name" />
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </form>
    `;
    }
}
