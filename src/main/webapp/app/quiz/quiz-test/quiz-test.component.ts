import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizConfig } from 'app/quiz/shared/quiz/quiz-config.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-quiz-test',
  templateUrl: './quiz-test.component.html',
  styles: []
})
export class QuizTestComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  testMode = QuizMode.TEST;

  config: QuizConfig = {
    allowMove: false,
    allowReview: false,
    duration: 3,
    countdown: true,
    showClock: true,
    autoMove: true,
    nbQuestions: 20,
    shuffleQuestions: true
  };

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.config = {
        allowMove: false,
        allowReview: false,
        duration: 3,
        countdown: true,
        showClock: true,
        autoMove: true,
        nbQuestions: 20,
        shuffleQuestions: true
      };

      this.loadQuiz();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadQuiz() {
    this.quizService.getTest().then((quiz: Quiz) => {
      this.quiz = quiz;
    });
  }

  reloadQuiz() {
    this.loadQuiz();
  }
}
