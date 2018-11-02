import { Option } from 'app/quiz/shared/option/option';

export class Question {
  id: number;
  name: string;
  questionTypeId?: number;
  options?: Option[];
  answered?: boolean;
}
