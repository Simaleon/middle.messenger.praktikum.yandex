import '../styles/style.less';

import Controller from "../Controller";
import Profile from "../pages_templates/profile/Profile";
import ProfileModel from "../pages_templates/profile/modules/data/ProfileModel";

new Controller(document.body, Profile, { model: ProfileModel });
