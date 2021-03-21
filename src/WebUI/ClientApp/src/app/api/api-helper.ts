import axios, {AxiosInstance} from "axios";
import authService from "../components/api-authorization/AuthorizeService";


export const API = {

    transformedResponseInstance(): AxiosInstance {
        return axios.create({transformResponse: data => data});
    },

    createdResponseInstance(): AxiosInstance {
        const instance = this.transformedResponseInstance();
        instance.interceptors.response.use(function (response) {
            if (response.status === 201) {
                response.status = 200;
            }
            return response;
        });
        return instance;
    },

    async authorizedInstance() {
        const instance = this.transformedResponseInstance()
        const token = await authService.getAccessToken();

        instance.interceptors.request.use(async req => {
            req.headers.common['Authorization'] = `Bearer ${token}`;
            return req
        })
        return instance
    }


}
