# Чат

## Описание

Небольшое веб-приложение для изучения принципов работы современных фреймворков.

## Скрипты запуска

- `npm run dev` — запуск dev-сервера
- `npm run build` — сборка проекта
- `npm run start` — запуск dev-сервера express
- `npm run lint` — запуск проверки ESLint

## Спринт 1

1. Нарисован прототип экранов проекта в [Figma](https://www.figma.com/file/HJoESXd9X0SsweylgvoekW/Yandex-Precticum-chat-template?node-id=1%3A616).
2. Настроена сборка с помощью Parcel
3. В качестве препроцессора использован LESS
4. Реализован собственный шаблонизатор
5. Все страницы созданы с помощью шаблонов
6. Готовые макеты выложены на [Netlify](https://incredible-eclair-9c40a6.netlify.app/)

По проекту можно перемещаться таким образом:
1. Со страницы логина на страницу регистрации по нажатию на "Нет аккаунта?"
2. Со страницы регистрации на страницу логина по нажатию на "Войти"
3. Со страницы логина на страницу чата по нажатию "Войти"
4. Со страницы чата на страницу профиля по нажатию на имя профиля ("Иван")
5. Со страницы профиля на страницу чата по нажатию стрелки назад слева экрана
6. Со страницы профиля на страницу редактирования профиля по нажатию "Изменить данные"
7. Со страницы профиля на страницу смены пароля по нажатию "Изменить пароль"
8. Со страницы профиля на страницу логина по нажатию "Выйти"

## Спринт 2
1. Проект переведён на TypeScript
2. Реализован компонентный подход
3. Реализован сбор данных из форм и вывод в консоль
4. Добавлена валидация на формы:
    * first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
    * login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
    * email — латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
    * password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
    * phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
    * message — не должно быть пустым.
5. Добавлен класс для работы с запросами на основе Promise и XHR
6. Добавлен ESLint. Использованы рекомендуемые правила для js и ts
