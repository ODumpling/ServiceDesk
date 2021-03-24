import {DeskDto, PaginatedListOfPaginatedListDeskDto} from "../../api/web-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../../store/store";
import {API} from "../../api/api-helper";

interface IDeskStore {
    listDesk: PaginatedListOfPaginatedListDeskDto,
    selectedDesk: DeskDto
}

const initialState: IDeskStore = {
    selectedDesk: {
        id         : '',
        slug       : '',
        name       : '',
        description: '',
        manager    : '',
        issues     : [],
    },
    listDesk    : {
        items          : [],
        pageIndex      : 0,
        totalPages     : 0,
        totalCount     : 0,
        hasPreviousPage: false,
        hasNextPage    : false,
    }
}

export const deskSlice = createSlice({
    name    : 'desk',
    initialState,
    reducers: {
        setDesk    : (state, action: PayloadAction<DeskDto>) => {
            state.selectedDesk = action.payload
        },
        setDeskList: (state, action: PayloadAction<PaginatedListOfPaginatedListDeskDto>) => {
            state.listDesk = action.payload
        }
    }

})

export const {setDesk, setDeskList} = deskSlice.actions

export const getDeskListAsync = (page: number, size: number): AppThunk => async dispatch => {
    const client = await API.DeskClient();
    client.listDesks(size, page).then((data) => dispatch(setDeskList(data))).catch(error => console.log(error))
}

export const getDeskAsync = (slug: string): AppThunk => async dispatch => {
    const client = await API.DeskClient();
    client.getDesk(slug).then((data) => dispatch(setDesk(data.desk!))).catch(error => console.error(error))
}

export const selectDesk = (state: RootState) => state.desks.selectedDesk
export const selectDeskList = (state: RootState) => state.desks.listDesk

export default deskSlice.reducer
