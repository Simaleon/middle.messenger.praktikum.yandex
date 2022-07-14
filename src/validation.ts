import { passwordRegExp } from "./Validator";

function onValid(field: HTMLElement) {
    const element = field.closest('.input');

    if(element) {
        element.classList.remove('input_has-error');
    }
}

function onInvalid(field: HTMLElement) {
    const element = field.closest('.input');

    if(element) {
        element.classList.add('input_has-error');
    }
}

function firstPasswordValidation(form: HTMLElement, value: string): boolean {
    const psw_2: HTMLInputElement | null = form.querySelector(`[name="password_2"]`);

    if(psw_2) {
        return !!value && passwordRegExp.test(value) && psw_2.value === value;
    } else {
        throw new Error('Password 2 doesn\'t exists');
    }
}

function secondPasswordValidation(form: HTMLElement, value: string): boolean {
    const psw: HTMLInputElement | null = form.querySelector(`[name="password"]`);

    if(psw) {
        return !!value && psw.value === value;
    } else {
        throw new Error('Password doesn\'t exists');
    }
}

export {
    onValid,
    onInvalid,
    firstPasswordValidation,
    secondPasswordValidation
}
