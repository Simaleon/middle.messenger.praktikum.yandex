import BasicAPI from "./BasicAPI";
import { response } from "./BasicAPI";

class AuthAPI extends BasicAPI {
    signup(formData: FormData): Promise<response> {
        return this.post('/auth/signup', this.formDataToJSON(formData));
    }

    signin(formData: FormData): Promise<response> {
        return this.post('/auth/signin', this.formDataToJSON(formData));
    }

    getUserInfo() {
        return this.get('/auth/user', { withCredentials: true });
    }
}

export default new AuthAPI();