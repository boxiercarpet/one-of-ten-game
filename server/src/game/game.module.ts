import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GameGateway } from './game.gateway';

@Module({
    providers: [GameService, GameGateway],
    controllers: [GameController],
    imports: [PrismaModule],
    exports: [GameGateway],
})
export class GameModule {}
