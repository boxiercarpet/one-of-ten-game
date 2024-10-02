import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameGateway } from 'src/game/game.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(
        private prisma: PrismaService,
        private gameGateway: GameGateway,
    ) {}

    async checkTeamGameAuthor(teamId: string, authorId: string) {
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamId,
            },
            select: {
                game: {
                    select: {
                        authorId: true,
                    },
                },
            },
        });

        if (!team) {
            throw new ForbiddenException('Team not found');
        }

        const isAuthor = team.game.authorId === authorId;

        if (!isAuthor) {
            throw new ForbiddenException(
                'You are not the author of this team quiz',
            );
        }
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
}
