import { api } from ".";
import { Question, Team } from "../types";

const questionApi = api.injectEndpoints({
    endpoints: (build) => ({
        updateQuestion: build.mutation<
            Question,
            {
                id: string;
                data: { content?: string; answer?: string };
            }
        >({
            query: ({ id, data }) => ({
                url: `/questions/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "GameQuestion", id },
            ],
        }),
        deleteQuestion: build.mutation<Question, string>({
            query: (id) => ({
                url: `/questions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "GameQuestion", id },
            ],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateQuestionMutation, useDeleteQuestionMutation } =
    questionApi;
