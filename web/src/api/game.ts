import { api } from ".";
import { FullGame, Game, Question, Team } from "../types";

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
        getGame: build.query<FullGame, string>({
            query: (id) => ({
                url: `/games/${id}`,
            }),
            providesTags: (result, _error, id) => [
                { type: "Game", id },
                ...(result
                    ? result.teams.map((team) => ({
                          type: "GameTeam" as const,
                          id: team.id,
                      }))
                    : []),
            ],
        }),
        updateGame: build.mutation<
            Game,
            { id: string; data: { title?: string } }
        >({
            query: ({ id, data }) => ({
                url: `/games/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Game", id },
            ],
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
        getGameQuestions: build.query<Question[], string>({
            query: (gameId) => ({
                url: `/games/${gameId}/questions`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((question) => ({
                              type: "GameQuestion" as const,
                              id: question.id,
                          })),
                          "GameQuestion",
                      ]
                    : ["GameQuestion"],
        }),
        createGameQuestion: build.mutation<
            Question,
            {
                gameId: string;
                data: {
                    content: string;
                    answer: string;
                };
            }
        >({
            query: ({ gameId, data }) => ({
                url: `/games/${gameId}/questions`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["GameQuestion"],
        }),
        rollQuestion: build.mutation<Question, string>({
            query: (gameId) => ({
                url: `/games/${gameId}/questions/roll`,
                method: "POST",
            }),
            invalidatesTags: ["Game"],
        }),
        rollTeam: build.mutation<Team, string>({
            query: (gameId) => ({
                url: `/games/${gameId}/teams/roll`,
                method: "POST",
            }),
            invalidatesTags: ["Game"],
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
    useGetGameQuestionsQuery,
    useCreateGameQuestionMutation,
    useRollQuestionMutation,
    useRollTeamMutation,
} = gameApi;
