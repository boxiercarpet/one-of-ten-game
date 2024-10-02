import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}

    async checkQuestionGameAuthor(questionId: string, authorId: string) {
        const question = await this.prisma.question.findUnique({
            where: {
                id: questionId,
            },
            select: {
                game: {
                    select: {
                        authorId: true,
                    },
                },
            },
        });

        if (!question) {
            throw new ForbiddenException('Question not found');
        }

        const isAuthor = question.game.authorId === authorId;

        if (!isAuthor) {
            throw new ForbiddenException(
                'You are not the author of this question quiz',
            );
        }
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
}
