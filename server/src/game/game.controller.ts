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
    constructor(private readonly quizService: GameService) {}

    @Get(':id')
    getQuiz(id: string) {
        return this.quizService.game(id);
    }

    @Post()
    createQuiz(@GetUser() user: User, @Body() body: CreateGameDto) {
        return this.quizService.createGame(user.id, body.title);
    }

    @Patch(':id')
    async updateQuiz(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body() body: UpdateGameDto,
    ) {
        await this.quizService.checkGameAuthor(id, user.id);
        return this.quizService.updateGame(id, body);
    }

    @Delete(':id')
    async deleteQuiz(@GetUser() user: User, @Param('id') id: string) {
        await this.quizService.checkGameAuthor(id, user.id);
        return this.quizService.deleteGame(id);
    }

    // Questions

    @Get(':id/questions')
    async getQuestions(@GetUser() user: User, @Param('id') quizId: string) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.questions(quizId);
    }

    @Post(':id/questions')
    async createQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Body() body: CreateQuestionDto,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.createQuestion(quizId, body);
    }

    @Patch(':id/questions/:questionId')
    async updateQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('questionId') questionId: string,
        @Body() body: CreateQuestionDto,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.updateQuestion(questionId, body);
    }

    @Delete(':id/questions/:questionId')
    async deleteQuestion(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('questionId') questionId: string,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.deleteQuestion(questionId);
    }

    @Post(':id/questions/roll')
    async rollQuestion(@GetUser() user: User, @Param('id') quizId: string) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.rollQuestion(quizId);
    }

    // Teams

    @Get(':id/teams')
    async getTeams(@Param('id') quizId: string) {
        return this.quizService.teams(quizId);
    }

    @Post(':id/teams')
    async createTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Body() body: CreateTeamDto,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.createTeam(quizId, body.name);
    }

    @Patch(':id/teams/:teamId')
    async updateTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('teamId') teamId: string,
        @Body() body: CreateTeamDto,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.updateTeam(teamId, body);
    }

    @Delete(':id/teams/:teamId')
    async deleteTeam(
        @GetUser() user: User,
        @Param('id') quizId: string,
        @Param('teamId') teamId: string,
    ) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.deleteTeam(teamId);
    }

    @Post(':id/teams/roll')
    async rollTeam(@GetUser() user: User, @Param('id') quizId: string) {
        await this.quizService.checkGameAuthor(quizId, user.id);
        return this.quizService.rollTeam(quizId);
    }
}
