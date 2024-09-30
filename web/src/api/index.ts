import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../store/auth";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.DEV ? "http://localhost:3000/api" : "/api",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403 || result?.error?.status === 401) {
        api.dispatch(setToken(null));
    }

    return result;
};

export const api = createApi({
    baseQuery: baseQueryWithAuth,
    endpoints: () => ({}),
});
