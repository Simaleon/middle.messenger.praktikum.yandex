import '../styles/style.less';

import Controller from "../Controller";
import ErrorPage from "../pages_templates/error/Error";

new Controller(document.body, ErrorPage, { data: { number: 500, text: 'Мы уже фиксим' } });
