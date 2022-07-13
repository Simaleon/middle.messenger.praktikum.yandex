function isObject(item: any): item is Record<string, any> {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// deep merge objects
export function merge(target: Record<string, any>, ...sources: Record<string, any>[]): Record<string, any> {
    if (!sources.length) {
        return target;
    }

    const source: Record<string, any> = sources.shift() as Record<string, any>;

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}
