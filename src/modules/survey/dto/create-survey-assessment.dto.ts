
import { IsString, IsNumber } from "@nestjs/class-validator";

export class CreateSurveyAssessmentDto {
    @IsString()
    questionId: string;

    @IsNumber()
    assessment: 1 | 2 | 3 | 4 | 5;

    @IsNumber()
    orderId: number;
}