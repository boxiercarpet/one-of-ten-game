import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type AuthState = {
    token: string | null;
};

const initialState: AuthState = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const authReducer = persistReducer(
    {
        key: authSlice.name,
        storage,
    },
    authSlice.reducer
);

export default authSlice;
export const { setToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
