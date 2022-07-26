import AuthAPI from "../api/AuthAPI";
import Store from "../Store";
import Router from "../router/Router";
import { response } from "../api/BasicAPI";

export class AuthController {
    private readonly _api = AuthAPI;

    signup(formData: FormData): Promise<response> {
        return this._api.signup(formData).then((response: response) => {
            if(response.status === 200) {
                Router.go('/');
            }

            return response;
        });
    }

    signin(formData: FormData): Promise<response> {
        return this._api.signin(formData).then((response: response) => {
            debugger
            if(response.status === 200) {
                Router.go('/messenger');
            }

            return response;
        });
    }

    getUserInfo(): Promise<response> {
        return this._api.getUserInfo().then((response: response) => {
            if(response.status === 200) {
                Store.set('user_info', response.body);
            }

            return response;
        });
    }
}

export default new AuthController();
