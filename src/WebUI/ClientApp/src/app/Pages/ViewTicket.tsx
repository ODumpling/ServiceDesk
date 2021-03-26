import React, {Fragment, useEffect} from "react";

import {addCommentAsync, getTicketAsync, selectTicket} from "../features/ticket/ticketSlice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CommentsSection} from "../components/CommentsSection";
import {Comment} from "../components/Comment";
import {TicketInformation} from "../components/TicketInformation";


export default function ViewTicket() {

    const dispatch = useDispatch()
    const ticket = useSelector(selectTicket);

    const {slug, ticketId} = useParams()
    useEffect(() => {
        dispatch(getTicketAsync(slug, ticketId))

    }, [dispatch, slug, ticketId])





    return (
        <Fragment>
            <TicketInformation ticket={ticket}/>

            <CommentsSection title="Comments" callback={(command) => {
                dispatch(addCommentAsync(slug,command))
            }}>
                {ticket.comments!.map((comment) => <Comment key={comment.id} comment={comment}/>)}
            </CommentsSection>
        </Fragment>
    );

}
