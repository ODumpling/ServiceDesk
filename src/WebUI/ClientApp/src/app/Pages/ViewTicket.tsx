import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TicketDto, TicketsClient} from "../api/web-client";
import {API} from "../api/api-helper";

export default function ViewTicket() {
    const [ticket, setTicket] = useState<TicketDto | undefined>({});

    const {slug, ticketId} = useParams();

    useEffect(() => {
        getTicketInfo(slug, ticketId)
    }, [slug, ticketId]);

    async function getTicketInfo(deskslug: string, ticketId: number) {
        console.log(deskslug)
        console.log(ticketId)
        const client = new TicketsClient(undefined, await API.instance());
        client.getTicket(deskslug, ticketId).then((data) => setTicket(data.ticket))
    }

    return (
        <Fragment>
            <div className="bg-white px-4 py-5 sm:px-6">
                <div className="flex space-x-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Ticket No# : {ticket?.id}
                        </p>
                        <p className="text-sm text-gray-500">
                            Issue: {ticket?.issue}
                        </p>
                        <p className="text-sm text-gray-500">
                            Description: {ticket?.description}
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
