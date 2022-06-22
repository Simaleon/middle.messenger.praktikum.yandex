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
            <h1 class="name">Иван</h1>
            
            <div for="item in dataList" class="data-string">
                <div class="property">{{ item.property }}</div>
                <div class="value">{{ item.value }}</div>
            </div>
            
            <div class="data-string buttons first">
                <a href="/profileData.html" class="property">Изменить данные</a>
            </div>
            <div class="data-string buttons">
                <a href="/profilePass.html" class="property">Изменить пароль</a>
            </div>
            <div class="data-string buttons red">
                <a href="/index.html" class="property">Выйти</a>
            </div>
        </div>
    `
};