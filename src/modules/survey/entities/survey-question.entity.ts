import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SurveyAssessment } from "./survey-assement.entity";

@Entity()
export class SurveyQuestion {
    @PrimaryGeneratedColumn('uuid')
    questionId: string;

    @Column()
    questionText: string;

    @Column()
    sequence: number;

    @Column()
    active: boolean;

    @CreateDateColumn()
    date: Date;

    @OneToMany(() => SurveyAssessment, (sa) => sa.surveyQuestion)
    surveyAssessments: SurveyAssessment[]
}