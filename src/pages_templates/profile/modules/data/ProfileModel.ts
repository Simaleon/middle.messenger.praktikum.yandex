import Model from "../../../../Model";

export type profileSettingsItem = {
    property: string,
    value: string,
    name: string,
    error?: string
}

export default class ProfileModel extends Model {
    static getData(): Promise<{ dataList: profileSettingsItem[] }> {
        return new Promise((resolve) => {
            resolve({
                dataList: [
                    {
                        property: 'Почта',
                        value: 'pochta@yandex.ru',
                        name: 'email',
                        error: 'Неверный формат почты'
                    },
                    {
                        property: 'Логин',
                        value: 'ivanivanov',
                        name: 'login',
                        error: 'Неверный формат логина'
                    },
                    {
                        property: 'Имя',
                        value: 'Иван',
                        name: 'name',
                        error: 'Неверный формат имени'
                    },
                    {
                        property: 'Фамилия',
                        value: 'Иванов',
                        name: 'surname',
                        error: 'Неверный формат фамилии'
                    },
                    {
                        property: 'Имя в чате',
                        value: 'Иванушка',
                        name: 'nickname'
                    },
                    {
                        property: 'Телефон',
                        value: '8 (800) 555 35 35',
                        name: 'phone',
                        error: 'Неверный формат телефона'
                    }
                ]
            });
        });
    }
}
