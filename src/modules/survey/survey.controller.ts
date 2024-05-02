import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { CreateSurveyQuestionDto } from "./dto/create-survey-question.dto";
import { SurveyQuestion } from "./entities/survey-question.entity";
import { CreateSurveyAssessmentDto } from "./dto/create-survey-assessment.dto";
import { SurveyAssessment } from "./entities/survey-assement.entity";


@Controller('survey')
export class SurveyCntroller {
    constructor(private readonly appService: SurveyService) { }

    @Post('question')
    async addQuestion(@Body() payload: CreateSurveyQuestionDto): Promise<SurveyQuestion> {
        return await this.appService.addQuestion(payload);
    }

    @Patch('question/:questionId')
    async updateQuestion(
        @Param('questionId') questionId: string,
        @Body() payload: CreateSurveyQuestionDto): Promise<SurveyQuestion> {
        return await this.appService.updateQuestion(questionId, payload);
    }

    @Patch('question/:questionId/set_active')
    async setQuestionActive(
        @Param('questionId') questionId: string,
        @Body('active') active: boolean): Promise<SurveyQuestion> {
        return await this.appService.setQuestionActive(questionId, active);
    }

    @Delete('question/:questionId')
    async deleteQuestion(@Param('questionId') questionId: string) {
        return await this.appService.deleteQuestion(questionId);
    }

    @Get('question')
    async getAllQuestions(@Query('filtro') filtro: string): Promise<SurveyQuestion[]> {
        return await this.appService.getAllQuestions(filtro)
    }

    @Get('question/active')
    async getActiveQuestions(): Promise<SurveyQuestion[]> {
        return await this.appService.getActiveQuestions()
    }

    @Get('question/:questionId')
    async getQuestionById(@Param('questionId') questionId: string): Promise<SurveyQuestion> {
        return await this.appService.getQuestionById(questionId);
    }


    @Post('assessment')
    async addAssessment(@Body() payload: CreateSurveyAssessmentDto[]): Promise<void> {
        await this.appService.addAssessment(payload);
    }

    @Get('assessment')
    async getAllAssessments(): Promise<SurveyAssessment[]> {
        return await this.appService.getAllAssessments();
    }

}