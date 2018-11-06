import { Option } from 'app/quiz/shared/option/option';
import { QuestionType } from 'app/quiz/shared/question-type/question-type';

export class Question {
  id: number;
  name: string;
  questionType?: QuestionType;
  options?: Option[];
  answered?: boolean;

  get isMulitpleChoice(): boolean {
    return this.questionType && this.questionType === QuestionType.MULTIPLE_CHOICE;
  }
}
