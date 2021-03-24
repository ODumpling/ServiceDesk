import {configureStore, Action, ThunkAction} from "@reduxjs/toolkit";
import ticketReducer from '../features/ticket/ticketSlice';
import deskReducer from '../features/desk/deskSlice';

export const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        desks  : deskReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
