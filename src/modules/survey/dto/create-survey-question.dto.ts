
import { IsString, IsBoolean } from "@nestjs/class-validator";
import { IsNumber } from "class-validator";

export class CreateSurveyQuestionDto {
    @IsString()
    questionText: string;

    @IsNumber()
    sequence: number;

    @IsBoolean()
    active: boolean;
}