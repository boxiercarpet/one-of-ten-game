import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTeamDto {
    @IsString()
    name?: string;

    @IsNumber()
    lives?: number;

    @IsNumber()
    score?: number;
}
