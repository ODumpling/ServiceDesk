import axios, {AxiosInstance} from "axios";
import authService from "../components/api-authorization/AuthorizeService";
import {CommentsClient, DesksClient, TicketsClient} from "./web-client";


export class apiHelper {
    async instance(): Promise<AxiosInstance> {
        const instance = axios.create({transformResponse: data => data})
        const token = await authService.getAccessToken();

        instance.interceptors.request.use(async req => {
            req.headers.common['Authorization'] = `Bearer ${token}`;
            return req
        }, function (error) {
            return error
        });

        instance.interceptors.response.use(function (response) {
            if (response.status === 201) {
                response.status = 200;
            }
            return response;
        }, function (error) {
            if (error.response.status === 401) {

                authService.signIn(null)
            }
            return error
        });
        return instance
    }

    async DeskClient() {
        const instance = await this.instance();
        return new DesksClient(undefined, instance);
    }

    async TicketClient() {
        const instance = await this.instance();
        return new TicketsClient(undefined, instance);
    }

    async CommentClient() {
        const instance = await this.instance();
        return new CommentsClient(undefined, instance);
    }
}

export const API = new apiHelper();
