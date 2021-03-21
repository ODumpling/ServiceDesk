import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TicketDto} from "../api/web-client";
import {API} from "../api/api-helper";
import {TicketInformation} from "../components/TicketInformation";
import {CommentsSection} from "../components/CommentsSection";
import {Comment} from "../components/Comment";

export default function ViewTicket() {
    const [ticket, setTicket] = useState<TicketDto | undefined>({});

    const {slug, ticketId} = useParams();

    useEffect(() => {
        getTicketInfo(slug, ticketId)
    }, [slug, ticketId]);

    async function getTicketInfo(deskslug: string, ticketId: number) {
        const client = await API.TicketClient();
        client.getTicket(deskslug, ticketId).then((data) => setTicket(data.ticket))
    }

    return (
        <Fragment>
            <TicketInformation ticket={ticket!}/>

            <CommentsSection title="Comments">
                <Comment username="Jane Doe"/>
                <Comment/>
            </CommentsSection>

        </Fragment>
    );
}
