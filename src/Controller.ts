import BasicAPI from "./api/BasicAPI";
import {optionsWithoutMethod} from "./HTTPTransport";

export class Controller {
    private readonly _apis: BasicAPI[] = [];

    private _getApi(path: string) {
        const api = this._apis.find((el) => { return el.match(path); });

        if(api) {
            return api;
        } else {
            throw new Error(`There is no api for path ${path}`);
        }
    }

    registerAPI(api: BasicAPI) {
        this._apis.push(api);
    }

    get(path: string, options?: optionsWithoutMethod) {
        const api = this._getApi(path);

        api.get(path, options).then((/*result*/) => {
            // todo
        });
    }

    post(path: string, options?: optionsWithoutMethod): Promise<any> {
        const api = this._getApi(path);

        return api.post(path, options);
    }
}

export default new Controller();
