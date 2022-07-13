import Component from "../../../../templator/Component";
import { message } from "../../ChatModel";
import './dialog.less';
import Validator from "../../../../Validator";

export default class Dialog extends Component {
    data() {
        return {
            user_id: null,
            dialog: {}
        };
    }

    methods() {
        return {
            groupMessages(this: Record<string, any>): { date: Date, messages: message[] }[] {
                const groupedMessages: { date: Date, messages: message[] }[] = [];

                let currentDate: Date | null,
                    currentArray: message[];

                this.dialog?.messages.forEach((message: message) => {
                    const date = new Date(message.date);

                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);

                    if(!currentDate || (date.getTime() !==  currentDate.getTime())) {
                        currentDate = date;
                        currentArray = [];

                        groupedMessages.push({
                            date: currentDate,
                            messages: currentArray
                        });
                    }

                    currentArray.push(message);
                });

                return groupedMessages;
            },
            sendMessage() {
                console.log()
            },
            submit(evt: SubmitEvent) {
                const formData = new FormData(evt.target as HTMLFormElement);
                console.log(...formData);
                evt.preventDefault();
            }
        }
    }

    componentDidMount() {
        new Validator(this.element().getElementsByTagName('form')[0], {
            fields: {
                message: '^.+',
            }
        });
    }

    template() {
        return `
        <div class="dialog">
            <header class="header">
                <div class="header__title">
                    <div class="header__avatar"></div>
                    <div class="header__name">{{ dialog.name }}</div>
                </div>
                <div class="menu">
                    <div class="menu__point"></div>
                    <div class="menu__point"></div>
                    <div class="menu__point"></div>
                </div>
            </header>
            <div class="messages">
                <div class="messages__groups" for="item in groupMessages()">
                    <div class="messages__date"> {{ item.date.toLocaleDateString([], { day: 'numeric', month:'long' }) }} </div>
                    <div class="message-box">
                        <div class="message" for="message in item.messages" :class-message_my="message.author_id === user_id">
                            <div class="message__text">{{ message.text }}</div>
                            <div class="message__time">{{ message.date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form class="footer" id="message_form" @submit="submit">
                <div class="footer__file"></div>
                <input class="footer__message" placeholder="Сообщение" name="message" />
                <button class="footer__send-message" @click="sendMessage"><div class="footer__send-message-icon"></div></button>
            </form>
        </div>
    `;
    }
}
