import './style.less';

import Templator from "../templator/Templator";
import profile from "../pages_templates/profile/profile";

document.body.appendChild(Templator.compile(profile, { mode: 'changeData' }));