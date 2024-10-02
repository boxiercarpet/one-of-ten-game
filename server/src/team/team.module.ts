import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { GameGateway } from 'src/game/game.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GameModule } from 'src/game/game.module';

@Module({
    controllers: [TeamController],
    providers: [TeamService],
    imports: [PrismaModule, GameModule],
})
export class TeamModule {}
