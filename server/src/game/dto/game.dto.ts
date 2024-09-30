import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
    @IsNotEmpty()
    title: string;
}

export class UpdateGameDto {
    @IsNotEmpty()
    title: string;
}
