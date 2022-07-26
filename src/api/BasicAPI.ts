import HTTPTransport, { optionsWithoutMethod } from "../HTTPTransport";
import { keyValueObject } from "../types";

const baseURL: string = 'https://ya-praktikum.tech/api/v2';

export type response = {
    status: number,
    body?: keyValueObject
}

export default class BasicAPI {
    private _errorHandler(error: any) {
        console.log(error);
        debugger
    }

    private _responseHandler(request: XMLHttpRequest): response {
        const result: response = {
            status: request.status
        };

        if(request.status === 200) {
            result.body = JSON.parse(request.response);
        }

        return result;
    }

    formDataToJSON(formData: FormData): { headers: Record<string, string>, data: string } {
        const object: Record<string, string> = {};

        formData.forEach((value, key) => object[key] = value as string);

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(object)
        };
    }

    get(path: string, options?: optionsWithoutMethod): Promise<any> {
        return HTTPTransport.get(baseURL + path, options).then(this._responseHandler).catch(this._errorHandler);
    }

    put(path: string, options?: optionsWithoutMethod): Promise<any> {
        return HTTPTransport.put(baseURL + path, options).catch(this._errorHandler);
    }

    post(path: string, options?: optionsWithoutMethod): Promise<any> {
        return HTTPTransport.post(baseURL + path, options).catch(this._errorHandler);
    }

    delete(path: string, options?: optionsWithoutMethod): Promise<any> {
        return HTTPTransport.delete(baseURL + path, options).catch(this._errorHandler);
    }
}