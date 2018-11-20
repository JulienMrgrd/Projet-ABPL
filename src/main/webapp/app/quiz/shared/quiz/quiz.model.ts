import { Question } from 'app/quiz/shared/question/question.model';
import { QuizConfig } from './quiz-config.model';

export interface Quiz {
  id: string;
  name: string;
  description: string;
  config: QuizConfig;
  questions: Question[];
}
