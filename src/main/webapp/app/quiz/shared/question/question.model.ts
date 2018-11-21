import { Option } from 'app/quiz/shared/option/option.model';
import { QuestionType } from 'app/quiz/shared/question-type/question-type.enum';

export interface Question {
  id: string;
  name: string;
  questionType: QuestionType; // QCM or simple choice
  options?: Option[]; // responses/choices
  image?: boolean;
  video?: boolean;
  explanation?: string;
  answered?: boolean;
}
