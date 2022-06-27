import './change.less';
import button from "../../../components/button/button";

export default {
    components: {
        'custom-button': button
    },
    data: {
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
    },
    template: `
        <div class="change-data">
            <div for="item in dataList" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <input class="change-data__input" type="password" :value="item.value" />
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </div>
    `
};