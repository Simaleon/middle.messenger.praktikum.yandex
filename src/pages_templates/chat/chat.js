import './chat.less';

export default {
    template: `
        <main class="chat">
            <div class="chat__nav">
                <div class="chat__nav-header">
                    <div class="chat-profile">
                        <div class="chat-profile__avatar"></div>
                        <a href="/profile.html" class="chat-profile__name">Иван</a>
                    </div>
                    <input class="chat__nav-search" placeholder="Поиск" />
                </div>
                <div class="chat__nav-chat-list">
                    <div class="chat__dummy">Заглушка списка чатов</div>
                </div>
            </div>
            <div class="chat__main">
                <div class="chat__dummy">Заглушка чата</div>
            </div>
        </main>
    `
};