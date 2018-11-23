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

export class QuestionUtils {
  static isCorrect(question: Question): boolean {
    return question.options.every(x => {
      return (x.selected && x.selected === x.isAnswer) || (!x.selected && !x.isAnswer);
    });
  }

  static isSimpleChoice(question: Question): boolean {
    return question && question.questionType === QuestionType.SIMPLE;
  }

  static isAnswered(question: Question): boolean {
    return question && question.options && !!question.options.find(x => x.selected);
  }

  static getAnswers(question: Question) {
    return question.options
      .map(opt => {
        if (opt.isAnswer) {
          return opt.name;
        }
      })
      .filter(res => !!res);
  }
}
