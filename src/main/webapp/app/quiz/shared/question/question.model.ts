import { MEDIA_TEST_URL } from 'app/app.constants';
import { Option } from 'app/quiz/shared/option/option.model';
import { QuestionType } from 'app/quiz/shared/question-type/question-type.enum';
import { FileObject } from 'app/shared/models/file-object.model';

export interface Question {
  id: string;
  name: string;

  questionType: QuestionType; // QCM or simple choice
  image?: string;
  video?: string;

  options?: Option[]; // responses/choices

  explanation?: string;
  explanation_image?: string;
  explanation_video?: string;

  answered?: boolean;
}

export class QuestionUtils {
  static isCorrect(question: Question): boolean {
    return question.options.every(x => {
      return (x.selected && x.selected === x.isAnswer) || (!x.selected && !x.isAnswer);
    });
  }

  static isCorrectOption(option: Option): boolean {
    return option.selected && option.selected === option.isAnswer;
  }

  static isCorrectButNotSelectedOption(option: Option): boolean {
    return !option.selected && option.isAnswer;
  }

  static isSimpleChoice(question: Question): boolean {
    return question && question.questionType === QuestionType.SIMPLE;
  }

  static isAnswered(question: Question): boolean {
    return question && question.options && !!question.options.find(x => x.selected);
  }

  static getAnswers(question: Question): FileObject[] {
    return question.options
      .map(opt => {
        if (opt.isAnswer) {
          return {
            filename: opt.image,
            name: opt.name
          };
        }
      })
      .filter(res => !!res);
  }

  static getMediaUrl(imageFilename: string) {
    // TODO: detect if file extension is correct, or display error
    if (imageFilename && imageFilename.includes('.')) {
      return MEDIA_TEST_URL + imageFilename;
    }
  }
}
