import React, {Fragment, useEffect} from "react";

import {getTicketAsync, selectComments, selectTicket, addComment} from "../features/ticket/ticketSlice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CommentsSection} from "../components/CommentsSection";
import {Comment} from "../components/Comment";
import {TicketInformation} from "../components/TicketInformation";
import {socket} from "../api/Websocket";


//TODO:: sockets
export default function ViewTicket() {

    const dispatch = useDispatch()
    const ticket = useSelector(selectTicket);
    const comments = useSelector(selectComments);

    const {slug, ticketId} = useParams()
    useEffect(() => {
        dispatch(getTicketAsync(slug, ticketId))

    }, [dispatch, slug, ticketId])

    useEffect(() => {
        socket.listen("ReceiveComment", (comment) => {
            console.log("=====Socket-Listen=====")
            console.log(comment)
            dispatch(addComment(comment));
            console.log("==========")
        });
        return () =>{
            socket.closeConnection();
        }
    },[dispatch]);



    return (
        <Fragment>
            <TicketInformation ticket={ticket}/>

            <CommentsSection title="Comments" callback={(command) => {
                socket.send("SendComment", command.ticketId, command.description)

            }}>
                {comments!.map((comment) => <Comment key={comment.id} comment={comment}/>)}
            </CommentsSection>
        </Fragment>
    );

}
