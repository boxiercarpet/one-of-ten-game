import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TeamModule } from './team/team.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        GameModule,
        UserModule,
        ServeStaticModule.forRoot({
            rootPath: '../web/dist',
            exclude: ['/api*'],
        }),
        TeamModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
