import { api } from ".";
import { Game, Team } from "../types";

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
      providesTags: (result) =>
        result
          ? [
              ...result.map((game) => ({
                type: "Game" as const,
                id: game.id,
              })),
              "Game",
            ]
          : ["Game"],
    }),
    getGame: build.query<Game, string>({
      query: (id) => ({
        url: `/games/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Game", id }],
    }),
    updateGame: build.mutation<Game, { id: string; data: { title?: string } }>({
      query: ({ id, data }) => ({
        url: `/games/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Game", id }],
    }),
    deleteGame: build.mutation<Game, string>({
      query: (id) => ({
        url: `/games/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Game", id }],
    }),
    getGameTeams: build.query<Team[], string>({
      query: (gameId) => ({
        url: `/games/${gameId}/teams`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((team) => ({
                type: "GameTeam" as const,
                id: team.id,
              })),
              "GameTeam",
            ]
          : ["GameTeam"],
    }),
    createGameTeam: build.mutation<Team, { name: string; gameId: string }>({
      query: ({ name, gameId }) => ({
        url: `/games/${gameId}/teams`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["GameTeam"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateGameMutation,
  useGetGamesQuery,
  useGetGameQuery,
  useUpdateGameMutation,
  useDeleteGameMutation,
  useGetGameTeamsQuery,
  useCreateGameTeamMutation,
} = gameApi;
