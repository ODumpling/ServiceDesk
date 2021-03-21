import axios, {AxiosInstance} from "axios";
import authService from "../components/api-authorization/AuthorizeService";


export const API = {
    async instance(): Promise<AxiosInstance> {
        const instance = axios.create({transformResponse: data => data})
        const token = await authService.getAccessToken();

        instance.interceptors.request.use(async req => {
            req.headers.common['Authorization'] = `Bearer ${token}`;
            return req
        });

        instance.interceptors.response.use(function (response) {
            if (response.status === 201) {
                response.status = 200;
            }
            return response;
        });
        return instance
    }
}
