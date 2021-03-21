import axios, {AxiosInstance} from "axios";
import authService from "../components/api-authorization/AuthorizeService";
import {DesksClient, TicketsClient} from "./web-client";


export class apiHelper {
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

    async DeskClient(){
        const instance = await this.instance();
        return new DesksClient(undefined, instance);
    }

    async TicketClient(){
        const instance = await this.instance();
        return new TicketsClient(undefined, instance);
    }
}

export const API = new apiHelper();
