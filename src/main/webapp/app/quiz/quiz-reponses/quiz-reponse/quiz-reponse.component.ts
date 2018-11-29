import { Component, Input } from '@angular/core';
import { MEDIA_TEST_URL } from 'app/app.constants';
import { QuizComponent } from 'app/quiz/quiz.component';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';

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

  utils = QuestionUtils;

  getMediaUrl(imageFilename: string) {
    return QuestionUtils.getMediaUrl(imageFilename);
  }
}
