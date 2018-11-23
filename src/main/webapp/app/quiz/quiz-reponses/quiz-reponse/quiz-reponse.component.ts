import { Component, Input } from '@angular/core';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';

@Component({
  selector: 'jhi-quiz-reponse',
  templateUrl: './quiz-reponse.component.html',
  styleUrls: ['../../quiz.css']
})
export class QuizReponseComponent {
  @Input()
  question: Question;

  @Input()
  index = -1;

  @Input()
  disabled;

  utils = QuestionUtils;
}
