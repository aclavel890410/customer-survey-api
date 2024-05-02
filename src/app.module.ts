import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './modules/survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "postgres",
      "database": "customer_survey_db",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    SurveyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
