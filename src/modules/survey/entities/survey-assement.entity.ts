import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SurveyQuestion } from "./survey-question.entity";

@Entity()
export class SurveyAssessment {
    @PrimaryGeneratedColumn('uuid')
    surveyAssessmentId: string;

    @ManyToOne(() => SurveyQuestion, (sq) => sq.surveyAssessments)
    surveyQuestion: SurveyQuestion;

    @Column()
    assessment: 1 | 2 | 3 | 4 | 5;

    @Column()
    orderId: number;

    @CreateDateColumn()
    date: Date;
}