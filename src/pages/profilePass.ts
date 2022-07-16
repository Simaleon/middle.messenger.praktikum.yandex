import '../styles/style.less';

import Controller from "../Controller";
import Profile from "../pages_templates/profile/Profile";

new Controller(document.body, Profile, { data: { mode: 'profilePass' } });
