import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { TeamService } from './team.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { UpdateTeamDto } from './dto/update.dto';

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Patch(':id')
    async updateTeam(
        @GetUser() user: User,
        @Param('id') teamId: string,
        @Body() body: UpdateTeamDto,
    ) {
        await this.teamService.checkTeamGameAuthor(teamId, user.id);
        return this.teamService.updateTeam(teamId, body);
    }

    @Delete(':id')
    async deleteTeam(@GetUser() user: User, @Param('id') teamId: string) {
        await this.teamService.checkTeamGameAuthor(teamId, user.id);
        return this.teamService.deleteTeam(teamId);
    }
}
