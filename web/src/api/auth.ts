import { api } from ".";
import { User } from "../types";

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
        me: build.query<User, void>({
            query: () => ({
                url: "/users/@me",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
