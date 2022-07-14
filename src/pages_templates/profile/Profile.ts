import './profile.less';
import main from './modules/data/ShowData'
import changeData from "./modules/data/ChangeData";
import changePassword from "./modules/changePassword";
import Component from "../../templator/Component";

export default class Profile extends Component {
    components() {
        return {
            'profile-main': main,
            'change-data': changeData,
            'change-pass': changePassword
        }
    }

    data() {
        return {
            dataList: [],
            mode: 'preview'
        }
    }

    methods() {
        return {
            href(this: { mode: string }) {
                if(this.mode === 'preview') {
                    return '/chat.html';
                }

                return '/profile.html';
            }
        }
    }

    template() {
        return `
        <div class="profile">
            <a :href="href()" class="profile__back-link">
                <div class="profile__back-link-icon"></div>
            </a>
            <div class="profile-content">
                <div class="profile-content__form">
                    <div class="profile-content__avatar"></div>
                    <profile-main if="mode === 'preview'" :datalist="dataList"></profile-main>
                    <change-data else-if="mode === 'changeData'" :datalist="dataList"></change-data>
                    <change-pass else></change-pass>
                </div>
            </div>
        </div>
    `;
    }
}
