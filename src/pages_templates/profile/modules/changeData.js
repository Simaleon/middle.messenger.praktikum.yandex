import './change.less';
import button from "../../../components/button/button";

export default {
    components: {
        'custom-button': button
    },
    data: {
        dataList: [
            {
                property: 'Почта',
                value: 'pochta@yandex.ru'
            },
            {
                property: 'Логин',
                value: 'ivanivanov'
            },
            {
                property: 'Имя',
                value: 'Иван'
            },
            {
                property: 'Фамилия',
                value: 'Иванов'
            },
            {
                property: 'Имя в чате',
                value: 'Иванушка'
            },
            {
                property: 'Телефон',
                value: '8 (800) 555 35 35'
            }
        ]
    },
    template: `
        <div class="change-data">
            <div for="item in dataList" class="data-string">
                <div class="property">{{ item.property }}</div>
                <input :value="item.value" />
            </div>
            <custom-button class="blue" text="Сохранить"></custom-button>
        </div>
    `
};