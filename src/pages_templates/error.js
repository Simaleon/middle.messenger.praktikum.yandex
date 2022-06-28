import './error.less';

export default {
    data: {
        number: 0,
        text: ''
    },
    template: `
        <div class="error-page">
            <div class="error-page__wrapper">
                <h1 class="error-page__header">{{ number }}</h1>
                <p class="error-page__text">{{ text }}</p>
                <a class="error-page__back-link" href="/chat.html">Назад к чатам</a>
            </div>
        </div>
    `
};