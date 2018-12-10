import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizConfig } from 'app/quiz/shared/quiz/quiz-config.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { Data } from 'app/shared/models/data.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-quiz-training',
  templateUrl: './quiz-training.component.html',
  styles: []
})
export class QuizTrainingComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  trainingMode = QuizMode.TRAINING;

  private categoryName: string;
  private quizFilename: string;

  config: QuizConfig = {
    allowMove: true,
    allowBack: true,
    allowReview: true,
    autoMove: false,
    showClock: false,
    countdown: false
  };

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private sharedData: Data, // used to avoid already get data to be reloaded
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(async params => {
      this.categoryName = params['path']; // TODO check empty path, NOW
      if (!this.categoryName) {
        console.error('Empty quiz path');
        this.router.navigate(['/']); // go to home
      }
      if (!this.sharedData.choosenQuiz) {
        this.quizFilename = await this.quizService.getQuizFilename(this.categoryName);
        if (!this.quizFilename) {
          console.error('Unknown quiz filename');
          this.router.navigate(['/']); // go to home
        }
      } else {
        this.quizFilename = this.sharedData.choosenQuiz.filename;
      }

      this.loadQuiz(this.categoryName, this.quizFilename);
    });
  }

  ngOnDestroy() {
    this.sharedData.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadQuiz(categoryName: string, quizFilename: string) {
    this.quizService.getQuizByNames(categoryName, quizFilename).then((quiz: Quiz) => {
      this.quiz = quiz;
    });
  }

  reloadQuiz() {
    this.loadQuiz(this.categoryName, this.quizFilename);
  }
}
