import { Question } from 'app/quiz/shared/question/question';
import { QuizConfig } from './quiz-config';

export interface Quiz {
  id: number;
  name: string;
  description: string;
  config: QuizConfig;
  questions: Question[];
}
