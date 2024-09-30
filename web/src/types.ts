export interface User {
    id: string;
    username: string;
}

export interface Game {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    currentQuestionId: string | null;
    currentTeamId: string | null;
}
