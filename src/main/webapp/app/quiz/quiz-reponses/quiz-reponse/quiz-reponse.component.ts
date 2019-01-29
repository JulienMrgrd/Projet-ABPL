import { Component, Input } from '@angular/core';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { ContentUtil } from 'app/shared/util/content-util';
import { FormatUtil } from 'app/shared/util/format-util';

@Component({
  selector: 'jhi-quiz-reponse',
  templateUrl: './quiz-reponse.component.html',
  styleUrls: ['quiz-response.css', '../../quiz.css']
})
export class QuizReponseComponent {
  @Input()
  question: Question;

  @Input()
  index = -1;

  @Input()
  disabled;

  @Input()
  quizMode: QuizMode = QuizMode.TRAINING;

  utils = QuestionUtils;
  formatUtil = FormatUtil;

  // TODO: load from Backend (S3, cloud, ...)
  getMediaUrl(imageFilename: string) {
    return ContentUtil.getMediaUrl(imageFilename, this.quizMode);
  }
}
