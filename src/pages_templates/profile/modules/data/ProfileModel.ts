import Model from "../../../../Model";

export default class ProfileModel extends Model {
    static getData(): Promise<{ dataList: { property: string, value: string }[] }> {
        return new Promise((resolve) => {
            resolve({
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
            });
        });
    }
}
