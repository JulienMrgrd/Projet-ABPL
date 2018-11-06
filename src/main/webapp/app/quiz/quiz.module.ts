import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuizComponent } from 'app/quiz/quiz.component';
import { quizState } from 'app/quiz/quiz.route';
import { QuizService } from 'app/quiz/shared/services/quiz.service';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(quizState)],
  declarations: [QuizComponent],
  entryComponents: [],
  providers: [QuizService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplQuizModule {}
