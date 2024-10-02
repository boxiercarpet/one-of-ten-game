import { api } from ".";
import { Team } from "../types";

const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateTeam: build.mutation<
      Team,
      { id: string; data: { name?: string; lives?: number; score?: number } }
    >({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "GameTeam", id }],
    }),
    deleteTeam: build.mutation<Team, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "GameTeam", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateTeamMutation, useDeleteTeamMutation } = teamApi;
