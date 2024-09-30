import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice, { authReducer } from "./auth";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authSlice.name]: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
