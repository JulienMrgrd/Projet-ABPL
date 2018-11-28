import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private quizService: QuizService, private sharedData: Data, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.categoryName = params['path']; // TODO check empty path, NOW
      if (!this.categoryName) {
        console.error('No choosen category...');
        this.categoryName = 'comportement'; // TODO: default quiz
      }
      if (!this.sharedData.choosenQuiz) {
        console.error('No choosen quiz...');
        this.quizFilename = 'n1_' + this.categoryName + '.json'; // TODO: LOAD default quiz by choosen category
      } else {
        this.quizFilename = this.sharedData.choosenQuiz.filename;
      }
      console.error('ON INIT TRAINING ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);

      this.loadQuiz(this.categoryName, this.quizFilename);
    });
  }

  ngOnDestroy() {
    console.error('ON DESTROY TEST ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
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
