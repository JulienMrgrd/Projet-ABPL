import { Routes } from '@angular/router';
import { QuizTestComponent } from 'app/quiz/quiz-test/quiz-test.component';
import { QuizTrainingComponent } from 'app/quiz/quiz-training/quiz-training.component';
import { QuizComponent } from 'app/quiz/quiz.component';

export const quizState: Routes = [
  {
    path: 'quiz',
    children: [
      {
        path: 'exam',
        component: QuizComponent,
        data: {
          // authorities: ['ROLE_USER', 'ROLE_PROF'],
          pageTitle: 'Examen ABPL'
        }
        // canActivate: [UserRouteAccessService, ProfRouteAccessService]
      },
      {
        path: 'test',
        component: QuizTestComponent,
        data: {
          authorities: [],
          pageTitle: 'Test blanc ABPL'
        }
      },
      {
        path: 'training/:path',
        component: QuizTrainingComponent,
        data: {
          authorities: [],
          pageTitle: 'Entraînement ABPL'
        }
      }
    ]
  }
];
