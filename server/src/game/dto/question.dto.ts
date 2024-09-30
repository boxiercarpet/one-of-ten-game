import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    answer: string;
}
