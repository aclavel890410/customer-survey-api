import { ConflictException, Injectable } from "@nestjs/common";
import { SurveyQuestion } from "./entities/survey-question.entity";
import { SurveyAssessment } from "./entities/survey-assement.entity";
import { CreateSurveyQuestionDto } from "./dto/create-survey-question.dto";
import { CreateSurveyAssessmentDto } from "./dto/create-survey-assessment.dto";
import { Repository, ILike, Not, In } from 'typeorm'
import { InjectRepository, } from '@nestjs/typeorm';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(SurveyQuestion)
        private readonly questionRepo: Repository<SurveyQuestion>,

        @InjectRepository(SurveyAssessment)
        private readonly assementRepo: Repository<SurveyAssessment>

    ) { }


    async addQuestion(payload: CreateSurveyQuestionDto): Promise<SurveyQuestion> {
        const exist = await this.questionRepo.findOneBy({ sequence: payload.sequence });
        if (exist)
            throw new ConflictException('secuence-exist')
        const question = new SurveyQuestion();
        question.active = payload.active;
        question.questionText = payload.questionText;
        question.sequence = payload.sequence;
        await this.questionRepo.save(question);
        return question;
    }

    async updateQuestion(questionId: string, payload: CreateSurveyQuestionDto): Promise<SurveyQuestion> {
        const exist = await this.questionRepo.findOne({
            where: {
                sequence: payload.sequence,
                questionId: Not(questionId)
            }
        });
        if (exist)
            throw new ConflictException('secuence-exist')
        const question = await this.questionRepo.findOneBy({ questionId })
        question.active = payload.active;
        question.questionText = payload.questionText;
        question.sequence = payload.sequence;
        await this.questionRepo.save(question);
        return question;
    }

    async setQuestionActive(questionId: string, active: boolean): Promise<SurveyQuestion> {
        const question = await this.questionRepo.findOneBy({ questionId })
        question.active = active;
        await this.questionRepo.save(question);
        return question;
    }

    async deleteQuestion(questionId: string): Promise<void> {
        await this.questionRepo.delete({ questionId })
    }

    async getQuestionById(questionId: string): Promise<SurveyQuestion> {
        return await this.questionRepo.findOne({
            where: {
                questionId
            },
            relations: {
                surveyAssessments: true
            }
        })
    }

    async getAllQuestions(filtro?: string): Promise<SurveyQuestion[]> {
        return await this.questionRepo.find({
            where: {
                //questionText: ILike(`%${filtro}%`)
            },
            relations: {
                surveyAssessments: true
            },
            order: {
                sequence: 'ASC',
                date: 'ASC'
            }
        });
    }

    async getActiveQuestions(): Promise<SurveyQuestion[]> {
        return await this.questionRepo.find({
            where: {
                active: true
            }
        });
    }



    async addAssessment(payload: CreateSurveyAssessmentDto[]) {
        const list = [];
        for (let i = 0; i < payload.length; i++) {
            const assessment = new SurveyAssessment();
            assessment.orderId = payload[i].orderId;
            assessment.assessment = payload[i].assessment;
            assessment.surveyQuestion = await this.questionRepo.findOneBy({ questionId: payload[i].questionId });
            list.push(assessment);
        }
        await this.assementRepo.save(list);
    }

    async getAllAssessments(): Promise<SurveyAssessment[]> {
        return await this.assementRepo.find();
    }
}