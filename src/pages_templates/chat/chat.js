import './chat.less';

export default {
    template: `
        <main class="chat">
            <div class="left">
                <div class="head">
                    <div class="profile">
                        <div class="avatar"></div>
                        <a href="/profile.html" class="name">Иван</a>
                    </div>
                    <input class="grey-input" placeholder="Поиск" />
                </div>
                <div class="chat-list">
                    <div class="dummy">Заглушка списка чатов</div>
                </div>
            </div>
            <div class="right">
                <div class="dummy">Заглушка чата</div>
            </div>
        </main>
    `
};