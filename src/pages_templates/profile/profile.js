import './profile.less';
import main from './modules/main'
import changeData from "./modules/changeData";
import changePassword from "./modules/changePassword";

export default {
    components: {
        'profile-main': main,
        'change-data': changeData,
        'change-pass': changePassword
    },
    data: {
        mode: 'preview'
    },
    methods: {
        href() {
            if(this.mode === 'preview') {
                return '/chat.html';
            }

            if(this.mode === 'changeData') {
                return '/profile.html';
            }

            return '/profile.html';
        }
    },
    template: `
        <div class="profile">
            <a :href="href()" class="back">
                <div class="back-icon"></div>
            </a>
            <div class="main">
                <div class="main-form">
                    <div class="avatar"></div>
                    <profile-main if="mode === 'preview'"></profile-main>
                    <change-data else-if="mode === 'changeData'"></change-data>
                    <change-pass else></change-pass>
                </div>
            </div>
        </div>
    `
};