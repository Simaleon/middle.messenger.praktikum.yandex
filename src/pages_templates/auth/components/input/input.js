import './input.less';

export default {
    data: {
        error: '',
        name: '',
        placeholder: '',
        type: 'text',
    },
    template: `
        <div>
            <div class="wrap-input">
                <input :type="type" :name="name" />
                <span class="focus-input" :data-placeholder="placeholder"></span>
            </div>
            <div class="error-message">{{ error }}</div>
        </div>
    `
};