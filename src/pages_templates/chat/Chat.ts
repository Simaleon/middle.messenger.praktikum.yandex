import Component from "../../templator/Component";
import ChatList from "./modules/chatList/ChatList";
import Dialog from "./modules/dialog/Dialog";
import './chat.less';

export default class Chat extends Component {
    components() {
        return {
            'chat-list': ChatList,
            'dialog-main': Dialog
        };
    }

    data() {
        return {
            chats: [],
            dialogs: {}
        }
    }

    template() {
        return `
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
                    <chat-list :chats="chats" :user_id="user_id"></chat-list>
                </div>
            </div>
            <div class="chat__main">
                <dialog-main :dialog="dialogs.id_1" :user_id="user_id"></dialog-main>
            </div>
        </main>
    `;
    }
}
