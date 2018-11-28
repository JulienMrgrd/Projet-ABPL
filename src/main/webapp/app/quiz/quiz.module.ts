import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizReponseComponent } from 'app/quiz/quiz-reponses/quiz-reponse/quiz-reponse.component';
import { QuizResponseModalComponent } from 'app/quiz/quiz-reponses/quiz-response-modal/quiz-response-modal.component';
import { FormatTimePipe, QuizComponent } from 'app/quiz/quiz.component';
import { quizState } from 'app/quiz/quiz.route';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { ProjetAbplSharedModule } from 'app/shared';

@NgModule({
  imports: [ProjetAbplSharedModule, RouterModule.forChild(quizState)],
  declarations: [QuizComponent, QuizResponseModalComponent, QuizReponseComponent, FormatTimePipe],
  entryComponents: [QuizResponseModalComponent],
  providers: [QuizService],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplQuizModule {}
