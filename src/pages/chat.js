import '../styles/style.less';

import Templator from "../templator/Templator";
import chat from "../pages_templates/chat/chat";

document.body.appendChild(Templator.compile(chat));