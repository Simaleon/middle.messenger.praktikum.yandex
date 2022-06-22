import './style.less';

import Templator from "../templator/Templator";
import registration from "../pages_templates/auth/registration/registration";

document.body.appendChild(Templator.compile(registration));