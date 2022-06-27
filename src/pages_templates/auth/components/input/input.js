import './input.less';

export default {
    data: {
        error: '',
        name: '',
        placeholder: '',
        type: 'text',
    },
    template: `
        <div class="auth-input">
            <div class="auth-input__wrapper">
                <input class="auth-input__input" :type="type" :name="name" />
                <span class="auth-input__input-focus" :data-placeholder="placeholder"></span>
            </div>
            <div class="auth-input__error-message">{{ error }}</div>
        </div>
    `
};