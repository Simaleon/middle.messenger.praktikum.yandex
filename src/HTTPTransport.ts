import { keyValueObject } from "./types";

enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

function queryStringify(data: keyValueObject) {
    return Object.entries(data).reduce((accumulator: string, currentValue: [string, any]) => {
        return accumulator+= `&${currentValue[0]}=${data[currentValue[1]].toString()}`;
    }, '').substring(1);
}

type options = {
    data?: any,
    timeout?: number,
    headers?: Record<string, string>
    withCredentials?: boolean
    method: METHODS
}

export type optionsWithoutMethod = Omit<options, 'method'>;

export class HTTPTransport {
    get(url: string, options: optionsWithoutMethod = {}): Promise<XMLHttpRequest>  {
        if(options.data) {
            url += '?' + queryStringify(options.data);
        }

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put(url: string, options: optionsWithoutMethod = {}): Promise<XMLHttpRequest>  {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post(url: string, options: optionsWithoutMethod = {}): Promise<XMLHttpRequest>  {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete(url: string, options: optionsWithoutMethod = {}): Promise<XMLHttpRequest>  {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // options:
    // headers — obj
    // data — obj
    request(url: string, options: options, timeout = 5000): Promise<XMLHttpRequest> {
        const {method, data, withCredentials = false} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;

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

export default new HTTPTransport();