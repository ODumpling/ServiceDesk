import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentDto, PaginatedListOfUserTicketDto, TicketDto} from "../../api/web-client";
import {AppThunk, RootState} from "../../store/store";
import {API} from "../../api/api-helper";

interface ITicketStore {
    selectedTicket: TicketDto
    ticketList: PaginatedListOfUserTicketDto
}

const initialState: ITicketStore = {
    selectedTicket: {
        id         : 0,
        description: '',
        issue      : '',
        comments   : [],
    },
    ticketList    : {
        items          : [],
        pageIndex      : 0,
        totalPages     : 0,
        totalCount     : 0,
        hasPreviousPage: false,
        hasNextPage    : false
    }
}

export const ticketSlice = createSlice({
    name    : 'ticket',
    initialState,
    reducers: {
        setTicket : (state, action: PayloadAction<TicketDto>) => {
            state.selectedTicket = action.payload
        },
        setList   : (state, action: PayloadAction<PaginatedListOfUserTicketDto>) => {
            state.ticketList = action.payload
        },
        addComment: (state, action: PayloadAction<CommentDto>) => {
            state.selectedTicket.comments = [...state.selectedTicket.comments!, action.payload]
        }
    }
})

export const {setTicket, setList, addComment} = ticketSlice.actions

export const getTicketAsync = (slug: string, id: number): AppThunk => async dispatch => {
    const client = await API.TicketClient()
    client.getTicket(slug, id).then((data) => dispatch(setTicket(data.ticket!))).catch(error => console.error(error))
};

export const getTicketListAsync = (slug: string, page: number, size: number): AppThunk => async dispatch => {
    const client = await API.TicketClient()
    client.listDeskTickets(slug, page, size).then((data) => dispatch(setList(data))).catch(error => console.error(error.status))
};


export const selectTicket = (state: RootState) => state.tickets.selectedTicket
export const selectTicketList = (state: RootState) => state.tickets.ticketList
export const selectComments = (state: RootState) => state.tickets.selectedTicket.comments

export default ticketSlice.reducer
