import Component from "../../templator/Component";

import './input.less';

export default class Input extends Component {
    data() {
        return {
            error: '',
            name: '',
            placeholder: '',
            type: 'text',
            value: ''
        }
    }

    methods() {
        return {
            blur(this: { element: () => HTMLElement }) {
                const input: HTMLInputElement = this.element().querySelector('input') as HTMLInputElement;

                if(input.value) {
                    input.classList.add('input__input_has-val');
                } else {
                    input.classList.remove('input__input_has-val');
                }
            }
        }
    }

    template() {
        return `
        <div class="input">
            <div class="input__wrapper">
                <input class="input__input" :type="type" :name="name" @blur="blur" :value="value" />
                <span class="input__input-focus" :data-placeholder="placeholder"></span>
            </div>
            <div class="input__error-message">{{ error }}</div>
        </div>
    `;
    }
}
