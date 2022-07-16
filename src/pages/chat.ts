import '../styles/style.less';

import Controller from "../Controller";
import Chat from "../pages_templates/chat/Chat";
import ChatModel from "../pages_templates/chat/ChatModel";

new Controller(document.body, Chat, { model: ChatModel });
