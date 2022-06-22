import './button.less';

export default {
    data: {
        text: '',
        type: 'submit'
    },
    template: `<button class="btn" :type="type">{{ text }}</button>`
};