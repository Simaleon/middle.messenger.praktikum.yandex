import './error.less';

export default {
    data: {
        number: 0,
        text: ''
    },
    template: `
        <div class="error-page">
            <div class="error">
                <h1>{{ number }}</h1>
                <p>{{ text }}</p>
                <a href="/chat.html">Назад к чатам</a>
            </div>
        </div>
    `
};