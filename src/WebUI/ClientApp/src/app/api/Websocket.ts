import * as signalR from "@microsoft/signalr";
import {HubConnectionState} from "@microsoft/signalr";
import authService from "../components/api-authorization/AuthorizeService";

export class SignalSocket {
    constructor(url?: string) {
        this.hubUrl = url ?? this.hubUrl;
        let instance = this;

        if (instance) {
            console.log("websocket instance")
            return
        }

    }

    connection: any;
    hubUrl: string = "/hub"

    ensureConnection() {
        if (this.connection !== undefined && this.connection.state === HubConnectionState.Disconnected) {
            console.log(this.connection)
            this.connection.start()
            console.log(this.connection)

        }
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.hubUrl, {
            accessTokenFactory(): string | Promise<string> {
                return authService.getAccessToken()
            }
        }).configureLogging(signalR.LogLevel.Information).build();


        this.connection.start();
    }

    closeConnection() {
        if (this.connection === undefined) {
            return;
        }
        if (this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.stop()
        }

    }

    listen(name: string, callback: (...arg: any[]) => void) {
        this.ensureConnection();
        try {

            this.connection!.on(name, callback);
        } catch (e) {
            console.error(e);
        }
    }

    send(name: string, ...args: any[]) {
        this.ensureConnection();
        if (this.connection!.state === HubConnectionState.Connected) {
            return this.connection!.send(name, ...args)
        }


    }
}

export const socket = new SignalSocket()
