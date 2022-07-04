import Component from "../../../../templator/Component";

import '../change.less';
import Button from "../../../../components/button/Button";

export default class ChangeData extends Component {
    components() {
        return {
            'custom-button': Button
        }
    }

    data() {
        return {
            datalist: []
        }
    }
    template() {
        return `
        <div class="change-data">
            <div for="item in datalist" class="data-string">
                <div class="data-string__property">{{ item.property }}</div>
                <input class="change-data__input" :value="item.value" />
            </div>
            <custom-button class="button_blue" text="Сохранить"></custom-button>
        </div>
    `;
    }
}
