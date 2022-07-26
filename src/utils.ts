import {keyValueObject} from "./types";

function isObject(item: any): item is keyValueObject {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// deep merge objects
export function merge(target: keyValueObject, ...sources: keyValueObject[]): keyValueObject {
    if (!sources.length) {
        return target;
    }

    const source: keyValueObject = sources.shift() as keyValueObject;

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key] as keyValueObject, source[key] as keyValueObject);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

export function cloneDeep(obj: keyValueObject) {
    if(Array.isArray(obj)) {
        const clone: any[] = [];

        obj.forEach((element: any) => {
            if(typeof element === 'object') {
                if(element === null) {
                    clone.push(null);
                } else {
                    clone.push(cloneDeep(element));
                }
            } else {
                clone.push(element);
            }
        });

        return clone;
    }

    const clone: keyValueObject = {};

    for(const i in obj) {
        if(obj[i] === 'object') {
            if(obj[i] === null) {
                clone[i] = null;
            } else {
                clone[i] = cloneDeep(obj[i] as keyValueObject);
            }
        } else {
            clone[i] = obj[i];
        }
    }

    return clone;
}

export function set(object: keyValueObject | unknown, path: string, value: unknown): keyValueObject | unknown {
    if(typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if(!isObject(object)) {
        object = {};
    }

    merge(object as keyValueObject, path.split('.').reduceRight((accumulator: keyValueObject | unknown, curValue: string) => {
        return {[curValue]: accumulator};
    }, value) as keyValueObject);

    return object;
}