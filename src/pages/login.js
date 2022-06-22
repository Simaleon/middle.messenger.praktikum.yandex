import './style.less';

import Templator from "../templator/Templator";
import login from "../pages_templates/auth/login/login";

document.body.appendChild(Templator.compile(login));