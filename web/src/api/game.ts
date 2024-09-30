import { api, generateProvidedTags } from ".";
import { Game } from "../types";

const gameApi = api.injectEndpoints({
    endpoints: (build) => ({
        createGame: build.mutation<Game, { title: string }>({
            query: (body) => ({
                url: "/games",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Game"],
        }),
        getGames: build.query<Game[], void>({
            query: () => ({
                url: "/games",
            }),
            // providesTags: generateProvidedTags("Game", (result) => result.id),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateGameMutation, useGetGamesQuery } = gameApi;
