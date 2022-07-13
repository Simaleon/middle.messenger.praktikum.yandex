import Component from "../../../../templator/Component";

import './input.less';

export default class Input extends Component {
    data() {
        return {
            error: '',
            name: '',
            placeholder: '',
            type: 'text'
        }
    }

    methods() {
        return {
            blur(this: Record<string, any>) {
                const input = this.element().querySelector('input');

                if(input.value) {
                    input.classList.add('auth-input__input_has-val');
                } else {
                    input.classList.remove('auth-input__input_has-val');
                }
            }
        }
    }

    template() {
        return `
        <div class="auth-input">
            <div class="auth-input__wrapper">
                <input class="auth-input__input" :type="type" :name="name" @blur="blur" />
                <span class="auth-input__input-focus" :data-placeholder="placeholder"></span>
            </div>
            <div class="auth-input__error-message">{{ error }}</div>
        </div>
    `;
    }
}
