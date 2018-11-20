import { Routes } from '@angular/router';
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
        component: QuizComponent,
        data: {
          config: {
            allowMove: false,
            allowReview: false,
            duration: 5, // in minutes
            autoMove: true
          },
          authorities: [],
          pageTitle: 'Test blanc ABPL'
        }
      },
      {
        path: 'training/:path',
        component: QuizComponent,
        data: {
          authorities: [],
          pageTitle: 'Entraînement ABPL'
        }
      },
      {
        path: 'revision',
        component: QuizComponent,
        data: {
          authorities: [],
          pageTitle: 'Révisions ABPL'
        }
      }
    ]
  }
];
