import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizComponent } from 'app/quiz/quiz.component';
import { quizState } from 'app/quiz/quiz.route';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { ProjetAbplSharedModule } from 'app/shared';

@NgModule({
  imports: [ProjetAbplSharedModule, RouterModule.forChild(quizState)],
  declarations: [QuizComponent],
  entryComponents: [],
  providers: [QuizService],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplQuizModule {}
