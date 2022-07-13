import Model from "../../../../Model";

export default class ProfileModel extends Model {
    static getData(): Promise<{ dataList: { property: string, value: string, name: string }[] }> {
        return new Promise((resolve) => {
            resolve({
                dataList: [
                    {
                        property: 'Почта',
                        value: 'pochta@yandex.ru',
                        name: 'email'
                    },
                    {
                        property: 'Логин',
                        value: 'ivanivanov',
                        name: 'login'
                    },
                    {
                        property: 'Имя',
                        value: 'Иван',
                        name: 'name'
                    },
                    {
                        property: 'Фамилия',
                        value: 'Иванов',
                        name: 'surname'
                    },
                    {
                        property: 'Имя в чате',
                        value: 'Иванушка',
                        name: 'nickname'
                    },
                    {
                        property: 'Телефон',
                        value: '8 (800) 555 35 35',
                        name: 'phone'
                    }
                ]
            });
        });
    }
}
