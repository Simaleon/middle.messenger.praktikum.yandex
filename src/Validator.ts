export type description = {
    fields: Record<string, string | RegExp | ((form: HTMLElement, value: string) => boolean)>
    onValid?: (field: HTMLElement) => void
    onInvalid?: (field: HTMLElement) => void
}

export default class Validator {
    constructor(form: HTMLElement, description: description) {
        const validationArr: (() => boolean)[] = [];

        for(const i in description.fields) {
            const field: HTMLInputElement | null = form.querySelector(`[name="${i}"]`);

            const validator: (form: HTMLElement, value: string) => boolean = (function () {
                if(typeof description.fields[i] === 'string') {
                    const regExp = new RegExp(description.fields[i] as string);

                    return (_form: HTMLElement, value: string) => regExp.test(value);
                } else if(description.fields[i] instanceof RegExp) {
                    return (_form: HTMLElement, value: string) => (description.fields[i] as RegExp).test(value);
                } else {
                    return description.fields[i] as (field: HTMLElement, value: string) => boolean;
                }
            })();

            if(field) {
                const validationFunc = () => {
                    if(validator(form, field.value)) {
                        description.onValid && description.onValid(field);

                        return true;
                    } else {
                        description.onInvalid && description.onInvalid(field);

                        return false;
                    }
                };

                field.addEventListener('blur', validationFunc);

                field.addEventListener('focus', () => {
                    description.onValid && description.onValid(field);
                });

                validationArr.push(validationFunc);
            } else {
                throw new Error('Fields doesn\'t exists');
            }
        }

        form.addEventListener('submit', (event) => {
            let isValid = true;

            validationArr.forEach((func) => {
                isValid = isValid && func();
            });

            if(isValid) {
                return true;
            } else {
                event.preventDefault();

                return false;
            }
        });
    }
}
