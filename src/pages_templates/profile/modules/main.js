import './main.less';

export default {
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
        <div class="profile-main">
            <h1 class="profile-main__name">Иван</h1>
            
            <div for="item in dataList" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <div class="data-string__value">{{ item.value }}</div>
            </div>
            
            <div class="data-string data-string_first">
                <a href="/profileData.html" class="data-string__link">Изменить данные</a>
            </div>
            <div class="data-string">
                <a href="/profilePass.html" class="data-string__link">Изменить пароль</a>
            </div>
            <div class="data-string">
                <a href="/index.html" class="data-string__link data-string__link_red">Выйти</a>
            </div>
        </div>
    `
};