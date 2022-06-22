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
                <div class="property">{{ item.property }}</div>
                <input type="password" :value="item.value" />
            </div>
            <custom-button class="blue" text="Сохранить"></custom-button>
        </div>
    `
};