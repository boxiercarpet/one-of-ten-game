import { IsString } from 'class-validator';

export class UpdateQuestionDto {
    @IsString()
    content?: string;

    @IsString()
    answer?: string;
}
