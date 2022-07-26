import Component from "../../templator/Component";
import ChatList from "./modules/chatList/ChatList";
import Dialog from "./modules/dialog/Dialog";
import './chat.less';
import AuthController from "../../controllers/AuthController";
import { response } from "../../api/BasicAPI";
import {keyValueObject} from "../../types";
import Store, {StoreEvents} from "../../Store";

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
            dialogs: {},
            display_name: 'Имя пользователя'
        }
    }

    componentDidMount(this: keyValueObject) {
        AuthController.getUserInfo().then((response: response) => {
            this.setProperties({ display_name: response.body!.display_name });

            Store.on(StoreEvents.Updated, (state: keyValueObject) => {
                if(state.user_info.display_name !== this.display_name) {
                    this.setProperties({ display_name: response.body!.display_name });
                }
            });
        });
    }

    template() {
        return `
        <main class="chat">
            <div class="chat__nav">
                <div class="chat__nav-header">
                    <div class="chat-profile">
                        <div class="chat-profile__avatar"></div>
                        <a href="/profile.html" class="chat-profile__name">{{ display_name }}</a>
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
