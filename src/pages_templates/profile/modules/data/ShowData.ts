import Component from "../../../../templator/Component";

import './showData.less';

export default class ShowData extends Component {
    data() {
        return {
            datalist: []
        }
    }

    template() {
        return `
        <div class="profile-main">
            <h1 class="profile-main__name">Иван</h1>
            
            <div for="item in datalist" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <div class="data-string__value">{{ item.value }}</div>
            </div>
            
            <div class="data-string data-string_first">
                <a href="/profileData.html" class="data-string__link">Изменить данные</a>
            </div>
            <div class="data-string">
                <a href="/profilePass.html" class="data-string__link">Изменить пароль</a>
            </div>
            <div class="data-string">
                <a href="/index.html" class="data-string__link data-string__link_red">Выйти</a>
            </div>
        </div>
    `;
    }
}
