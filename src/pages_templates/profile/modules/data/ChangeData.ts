import Component from "../../../../templator/Component";

import '../change.less';
import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import Validator, { emailRegExp, phoneRegExp, loginRegExp, nameRegExp } from "../../../../Validator";
import { onInvalid, onValid } from "../../../../validation";
import { profileSettingsItem } from "./ProfileModel";

export default class ChangeData extends Component {
    components() {
        return {
            'custom-button': Button,
            'custom-input': Input
        }
    }

    data() {
        return {
            datalist: []
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

    componentDidMount(this: {properties: () => { datalist: profileSettingsItem[] }, element: () => HTMLFormElement }) {
        if(this.properties().datalist.length) {
            new Validator(this.element(), {
                fields: {
                    email: emailRegExp,
                    login: loginRegExp,
                    name: nameRegExp,
                    surname: nameRegExp,
                    phone: phoneRegExp
                },
                onValid: onValid,
                onInvalid: onInvalid
            });
        }
    }

    template() {
        return `
        <form class="change-data" @submit="submit">
            <div for="item in datalist" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <custom-input class="change-data__input input_no-placeholder" :value="item.value" :name="item.name" :error="item.error"></custom-input>
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </form>
    `;
    }
}
