import { Module } from '@nestjs/common';
import { SurveyCntroller } from './survey.controller';
import { SurveyService } from './survey.service';
import { SurveyAssessment } from './entities/survey-assement.entity';
import { SurveyQuestion } from './entities/survey-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SurveyAssessment, 
            SurveyQuestion
        ])
    ],
    controllers: [SurveyCntroller],
    providers: [SurveyService],
    exports: [TypeOrmModule]
})
export class SurveyModule {}
