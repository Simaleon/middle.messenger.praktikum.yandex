import Model from "../../Model";

export type chatListItem = {
    name: string
    lastMessage: string
    lastMessageAuthorId: string
    timestamp: string
    unreadCount: number,
    id: string
};

export type message = {
    author_id: string
    text: string
    date: Date
    attachments?: [
        {
            type: string
            content: string
        }
    ]
};

export type dialog = {
    name: string,
    messages: message[]
};

export type chatData = {
    user_id: string,
    chats: chatListItem[],
    dialogs: Record<string, dialog>
};

export default class ChatModel extends Model {
    static getData(): Promise<chatData> {
        return new Promise<chatData>((resolve) => {
            resolve({
                user_id: '1',
                chats: [
                    {
                        name: 'Андрей',
                        lastMessage: 'Изображение',
                        lastMessageAuthorId: '2',
                        timestamp: '16:10', //1657126769,
                        unreadCount: 2,
                        id: 'id_1'
                    },
                    {
                        name: 'Киноклуб',
                        lastMessage: 'стикер',
                        lastMessageAuthorId: '1',
                        timestamp: '15:15', //1656953969,
                        unreadCount: 0,
                        id: 'id_2'
                    },
                    {
                        name: 'Илья',
                        lastMessage: 'Я вижу, что ты в сети, но не читаешь! Ответь!',
                        lastMessageAuthorId: '3',
                        timestamp: 'Чт', //1657040369,
                        unreadCount: 10,
                        id: 'id_3'
                    }
                ],
                dialogs: {
                    id_1: {
                        name: 'Андрей',
                        messages: [
                            {
                                author_id: '2',
                                text: 'Привет! Есть интересные новости по нашему проекту',
                                date: new Date(1657040369)
                            },
                            {
                                author_id: '2',
                                text: 'Давай встретимся завтра в 9 к нашем кафе?',
                                date: new Date(1657040369),
                            }
                        ]
                    }
                }
            });
        });
    }
}
