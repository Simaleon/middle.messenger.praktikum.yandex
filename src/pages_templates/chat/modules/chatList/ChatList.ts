import Component from "../../../../templator/Component";

import './chatList.less';

export default class ChatList extends Component {
    data() {
        return {
            user_id: null,
            chats: []
        };
    }

    template() {
        return `
        <div class="chat-list">
            <div class="chat-list-item" for="item in chats">
                <div class="chat-list-item__avatar"></div>
                <div class="chat-list-item__desc-wrapper">
                    <div class="chat-list-item__desc">
                        <div class="chat-list-item__header">{{ item.name }}</div>
                        <div class="chat-list-item__last-message"><span class="chat-list-item__last-message-yours" if="user_id === item.lastMessageAuthorId">Вы:</span>{{ item.lastMessage }}</div>
                    </div>
                    <div class="chat-list-item__info">
                        <div class="chat-list-item__date">{{ item.timestamp }}</div>
                        <div if="item.unreadCount > 0" class="chat-list-item__unread-message-count">{{ item.unreadCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}
