import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { UpdateQuestionDto } from './dto/update.dto';

@Controller('questions')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Patch(':id')
    async updateTeam(
        @GetUser() user: User,
        @Param('id') questionId: string,
        @Body() body: UpdateQuestionDto,
    ) {
        await this.questionService.checkQuestionGameAuthor(questionId, user.id);
        return this.questionService.updateQuestion(questionId, body);
    }

    @Delete(':id')
    async deleteTeam(@GetUser() user: User, @Param('id') questionId: string) {
        await this.questionService.checkQuestionGameAuthor(questionId, user.id);
        return this.questionService.deleteQuestion(questionId);
    }
}
