import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizReponseComponent } from 'app/quiz/quiz-reponses/quiz-reponse/quiz-reponse.component';
import { QuizResponseModalComponent } from 'app/quiz/quiz-reponses/quiz-response-modal/quiz-response-modal.component';
import { QuizComponent } from 'app/quiz/quiz.component';
import { quizState } from 'app/quiz/quiz.route';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { ProjetAbplSharedModule } from 'app/shared';
import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';
import { QuizTestComponent } from './quiz-test/quiz-test.component';
import { QuizTrainingComponent } from './quiz-training/quiz-training.component';

@NgModule({
  imports: [ProjetAbplSharedModule, RouterModule.forChild(quizState)],
  declarations: [QuizComponent, QuizResponseModalComponent, QuizReponseComponent, QuizTestComponent, QuizTrainingComponent],
  entryComponents: [QuizResponseModalComponent],
  providers: [QuizService, FormatTimePipe],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplQuizModule {}
