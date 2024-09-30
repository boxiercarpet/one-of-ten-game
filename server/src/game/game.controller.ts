import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';
import { CreateQuestionDto } from './dto/question.dto';
import { CreateTeamDto } from './dto/team.dto';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    getQuizzes(@GetUser() user: User) {
        return this.gameService.games(user.id);
    }

    @Get(':id')
    getGame(id: string) {
        return this.gameService.game(id);
    }

    @Post()
    createGame(@GetUser() user: User, @Body() body: CreateGameDto) {
        return this.gameService.createGame(user.id, body.title);
    }

    @Patch(':id')
    async updateQuiz(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body() body: UpdateGameDto,
    ) {
        await this.gameService.checkGameAuthor(id, user.id);
        return this.gameService.updateGame(id, body);
    }

    @Delete(':id')
    async deleteQuiz(@GetUser() user: User, @Param('id') id: string) {
        await this.gameService.checkGameAuthor(id, user.id);
        return this.gameService.deleteGame(id);
    }

    // Questions

    @Get(':id/questions')
    async getQuestions(@GetUser() user: User, @Param('id') quizId: string) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.questions(quizId);
    }

    @Post(':id/questions')
    async createQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Body() body: CreateQuestionDto,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.createQuestion(quizId, body);
    }

    @Patch(':id/questions/:questionId')
    async updateQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('questionId') questionId: string,
        @Body() body: CreateQuestionDto,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.updateQuestion(questionId, body);
    }

    @Delete(':id/questions/:questionId')
    async deleteQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('questionId') questionId: string,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.deleteQuestion(questionId);
    }

    @Post(':id/questions/roll')
    async rollQuestion(@GetUser() user: User, @Param('id') quizId: string) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.rollQuestion(quizId);
    }

    // Teams

    @Get(':id/teams')
    async getTeams(@Param('id') quizId: string) {
        return this.gameService.teams(quizId);
    }

    @Post(':id/teams')
    async createTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Body() body: CreateTeamDto,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.createTeam(quizId, body.name);
    }

    @Patch(':id/teams/:teamId')
    async updateTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('teamId') teamId: string,
        @Body() body: CreateTeamDto,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.updateTeam(teamId, body);
    }

    @Delete(':id/teams/:teamId')
    async deleteTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('teamId') teamId: string,
    ) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.deleteTeam(teamId);
    }

    @Post(':id/teams/roll')
    async rollTeam(@GetUser() user: User, @Param('id') quizId: string) {
        await this.gameService.checkGameAuthor(quizId, user.id);
        return this.gameService.rollTeam(quizId);
    }
}
