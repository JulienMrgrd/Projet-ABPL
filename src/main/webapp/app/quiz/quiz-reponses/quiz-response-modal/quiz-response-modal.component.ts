import { Component, OnInit } from '@angular/core';
import { Question, QuestionUtils } from '../../shared/question/question.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-quiz-response-modal',
  templateUrl: './quiz-response-modal.component.html',
  styleUrls: ['../../quiz.css', 'quiz-response-modal.css']
})
export class QuizResponseModalComponent implements OnInit {
  question: Question;
  index = -1; // question number, -1 by default

  utils = QuestionUtils;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
    console.log('modal init');
  }
}
