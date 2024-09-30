import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameService {
    constructor(
        private prisma: PrismaService,
        private gameGateway: GameGateway,
    ) {}

    async games(authorId: string) {
        return this.prisma.game.findMany({
            where: {
                authorId,
            },
        });
    }

    async game(id: string) {
        return this.prisma.game.findUnique({
            where: {
                id,
            },
            include: {
                teams: true,
            },
        });
    }

    async checkGameAuthor(gameId: string, authorId: string) {
        const game = await this.prisma.game.findUnique({
            where: {
                id: gameId,
            },
            select: {
                authorId: true,
            },
        });

        if (!game) {
            throw new ForbiddenException('Quiz not found');
        }

        const isAuthor = game.authorId === authorId;

        if (!isAuthor) {
            throw new ForbiddenException('You are not the author of this quiz');
        }
    }

    async createGame(authorId: string, title: string) {
        return this.prisma.game.create({
            data: {
                title,
                author: { connect: { id: authorId } },
            },
        });
    }

    async updateGame(id: string, data: Prisma.GameUpdateInput) {
        const game = await this.prisma.game.update({
            where: {
                id,
            },
            data,
        });
        this.gameGateway.server.to('game-' + game.id).emit('gameUpdated', game);
        return game;
    }

    async deleteGame(id: string) {
        const game = await this.prisma.game.delete({
            where: {
                id,
            },
        });
        this.gameGateway.server.to('game-' + game.id).emit('gameDeleted', game);
        return game;
    }

    // Questions

    async questions(gameId: string) {
        return this.prisma.question.findMany({
            where: {
                gameId,
            },
        });
    }

    async createQuestion(
        quizId: string,
        data: { content: string; answer: string },
    ) {
        return this.prisma.question.create({
            data: {
                ...data,
                game: { connect: { id: quizId } },
            },
        });
    }

    async updateQuestion(id: string, data: Prisma.QuestionUpdateInput) {
        return this.prisma.question.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteQuestion(id: string) {
        return this.prisma.question.delete({
            where: {
                id,
            },
        });
    }

    async rollQuestion(gameId: string) {
        const questions = await this.prisma.question.findMany({
            where: {
                gameId,
            },
        });

        if (questions.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];

        this.gameGateway.server
            .to('game-' + gameId)
            .emit('questionRolled', question);

        await this.prisma.game.update({
            where: {
                id: gameId,
            },
            data: {
                currentQuestion: {
                    connect: {
                        id: question.id,
                    },
                },
            },
        });

        return question;
    }

    // Teams

    async teams(gameId: string) {
        return this.prisma.team.findMany({
            where: {
                gameId,
            },
        });
    }

    async createTeam(gameId: string, name: string) {
        const team = await this.prisma.team.create({
            data: {
                name,
                game: { connect: { id: gameId } },
            },
        });
        this.gameGateway.server
            .to('game-' + team.gameId)
            .emit('teamCreated', team);
        return team;
    }

    async updateTeam(id: string, data: Prisma.TeamUpdateInput) {
        const team = await this.prisma.team.update({
            where: {
                id,
            },
            data,
        });
        this.gameGateway.server
            .to('game-' + team.gameId)
            .emit('teamUpdated', team);
        return team;
    }

    async deleteTeam(id: string) {
        const team = await this.prisma.team.delete({
            where: {
                id,
            },
        });
        this.gameGateway.server
            .to('game-' + team.gameId)
            .emit('teamDeleted', team);
        return team;
    }

    async rollTeam(gameId: string) {
        const teams = await this.prisma.team.findMany({
            where: {
                gameId,
            },
        });

        if (teams.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * teams.length);
        const team = teams[randomIndex];

        this.gameGateway.server.to('game-' + gameId).emit('teamRolled', team);

        await this.prisma.game.update({
            where: {
                id: gameId,
            },
            data: {
                currentTeam: {
                    connect: {
                        id: team.id,
                    },
                },
            },
        });

        return team;
    }
}
