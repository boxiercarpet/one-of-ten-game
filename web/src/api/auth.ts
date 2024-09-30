import { api } from ".";

type AuthResponse = {
    access_token: string;
};

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<
            AuthResponse,
            {
                username: string;
                password: string;
            }
        >({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        register: build.mutation<
            AuthResponse,
            {
                username: string;
                password: string;
            }
        >({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        me: build.query({
            query: () => ({
                url: "/auth/me",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
