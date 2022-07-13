enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

function queryStringify(data: Record<string, any>) {
    let str = '';

    for(const i in data) {
        str += `&${i}=${data[i].toString()}`;
    }

    return str.substring(1);
}

type options = {
    data?: any,
    timeout?: number,
    headers?: Record<string, string>
    method: METHODS
}

type optionsWithoutMethod = Omit<options, 'method'>;

export default class HTTPTransport {
    get = (url: string, options: optionsWithoutMethod = {}) => {
        if(options.data) {
            url += '?' + queryStringify(options.data);
        }

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url: string, options: optionsWithoutMethod = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url: string, options: optionsWithoutMethod = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url: string, options: optionsWithoutMethod = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: options, timeout = 5000) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            xhr.timeout = timeout;

            if(options.headers) {
                for(const i in options.headers) {
                    xhr.setRequestHeader(i, options.headers[i]);
                }
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
