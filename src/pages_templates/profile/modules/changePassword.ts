import Component from "../../../templator/Component";

import './change.less';
import button from "../../../components/button/Button";

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
                    value: 'badpass'
                },
                {
                    property: 'Новый пароль',
                    value: 'newsupermegapass'
                },
                {
                    property: 'Повторите новый пароль',
                    value: 'newsupermegapass'
                }
            ]
        }
    }

    template() {
        return `
        <div class="change-data">
            <div for="item in dataList" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <input class="change-data__input" type="password" :value="item.value" />
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </div>
    `;
    }
}
