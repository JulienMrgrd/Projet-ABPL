import { Routes } from '@angular/router';
import { QuizComponent } from 'app/quiz/quiz.component';

export const quizState: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
    data: {
      authorities: [],
      pageTitle: 'Quiz ABPL'
    }
  }
];
