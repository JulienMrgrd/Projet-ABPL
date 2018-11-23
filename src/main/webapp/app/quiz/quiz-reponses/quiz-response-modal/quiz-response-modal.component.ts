import { Component } from '@angular/core';
import { ModalContentComponent } from 'app/shared/modal/modal-content/modal-content.component';
import { Question } from '../../shared/question/question.model';

@Component({
  selector: 'jhi-quiz-response-modal',
  templateUrl: './quiz-response-modal.component.html',
  styles: []
})
export class QuizResponseModalComponent extends ModalContentComponent {
  question: Question;
  index: number = -1; // question number, -1 by default
}
