import './button.less';

export default {
    data: {
        text: '',
        type: 'submit'
    },
    template: `<button class="button" :type="type">{{ text }}</button>`
};