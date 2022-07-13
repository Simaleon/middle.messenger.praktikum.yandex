import Component from "../../../../templator/Component";

import '../change.less';
import Button from "../../../../components/button/Button";
import Validator from "../../../../Validator";

export default class ChangeData extends Component {
    components() {
        return {
            'custom-button': Button
        }
    }

    data() {
        return {
            datalist: []
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
                email: '^\\S+@\\S+\\.\\S+$',
                phone: '^\\+[1-9]{1}[0-9]{3,14}$'
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
            <div for="item in datalist" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <input class="change-data__input" :value="item.value" :name="item.name" />
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </form>
    `;
    }
}
