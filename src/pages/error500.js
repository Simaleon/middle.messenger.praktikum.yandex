import '../styles/style.less';

import Templator from "../templator/Templator";
import page from "../pages_templates/error";

document.body.appendChild(Templator.compile(page, { number: 500, text: 'Мы уже фиксим' }));