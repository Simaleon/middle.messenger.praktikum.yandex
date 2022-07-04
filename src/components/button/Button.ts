import Component from "../../templator/Component";
import "./button.less";

export default class Button extends Component {
    data() {
        return {
            text: '',
                type: 'submit'
        }
    }
    template() {
        return `<button class="button" :type="type">{{ text }}</button>`;
    }
}
