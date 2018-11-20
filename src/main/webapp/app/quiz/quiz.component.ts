import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Option } from 'app/quiz/shared/option/option.model';
import { QuestionType } from 'app/quiz/shared/question-type/question-type.enum';
import { Question } from 'app/quiz/shared/question/question.model';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { TimeUtil } from 'app/shared/util/time-util';
import { Data } from 'app/shared/models/data.model';
import { Subscription } from 'rxjs';
import { QuizConfig } from 'app/quiz/shared/quiz/quiz-config.model';

@Component({
  selector: 'jhi-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  categoryName: string;
  quizFilename: string;

  // template values
  isTest = false; // TODO enum ?
  quizModeEnum = QuizMode;
  mode = QuizMode.QUIZ;
  config: QuizConfig = this.getDefaultConfig();

  pager = this.initPager();
  timer: any = null;
  startTime: Date;
  ellapsedTime = '00:00';

  routeDataSub: Subscription; // TODO: replace by takeUntil

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private sharedData: Data) {}

  async ngOnInit() {
    this.routeDataSub = this.activatedRoute.params.subscribe(params => {
      // TODO: RESOLVER
      this.categoryName = params['path']; // TODO check empty path, NOW
      if (!this.categoryName) {
        console.error('No choosen category...');
        this.categoryName = 'comportement'; // TODO: go to home page
      }
      if (!this.sharedData.choosenQuiz) {
        console.error('No choosen quiz...');
        this.quizFilename = 'n1_' + this.categoryName + '.json'; // TODO: LOAD default quiz by choosen category
      } else {
        this.quizFilename = this.sharedData.choosenQuiz.filename;
      }
      console.error('ON INIT ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);

      if (!params['path']) {
        // DETECT TEST mode (data.config, url, ...)
        this.isTest = true;
        this.config = {
          allowMove: false,
          allowReview: false,
          duration: 5,
          showClock: true,
          autoMove: true
        };
      }

      this.loadQuiz(this.categoryName, this.quizFilename);
    });
  }

  ngOnDestroy() {
    console.error('ON DESTROY ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
    clearInterval(this.timer);
    this.sharedData.reset();
    this.routeDataSub.unsubscribe(); // TODO: TakeUntil
  }

  loadQuiz(categoryName: string, quizFilename: string) {
    this.quizService.getQuizByNames(categoryName, quizFilename).then((quiz: Quiz) => {
      this.quiz = quiz;
      this.mode = QuizMode.QUIZ;

      // default values
      this.quiz.questions.forEach(question => question.options.forEach(opt => (opt.selected = false)));

      this.pager = this.initPager();
      this.pager.count = this.quiz.questions.length;

      this.startTimer();
    });
  }

  reloadQuiz() {
    console.error('ON INIT ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
    this.loadQuiz(this.categoryName, this.quizFilename);
  }

  private initPager() {
    return {
      index: 0,
      size: 1,
      count: 1
    };
  }

  private startTimer() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }

    this.startTime = new Date();
    this.timer = setInterval(() => {
      // every second
      const now = new Date();
      const diff = (now.getTime() - this.startTime.getTime()) / 1000;
      // if (diff >= this.quiz.config.duration) {  TODO: timer
      //   this.onSubmit();
      // }
      this.ellapsedTime = TimeUtil.parseTime(diff);
    }, 1000);
    // this.duration = this.parseTime(this.quiz.config.duration); TODO: timer
  }

  get filteredQuestions(): Question[] {
    return this.quiz.questions ? this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  /**
   * Unselect all others options (radio buttons) for this question, except the given one.
   */
  onSelect($event, question: Question, response: Option) {
    if ($event.target.checked && this.isSimpleChoice(question)) {
      question.options.forEach(opt => {
        opt.selected = opt.id === response.id;
      });
    }

    /*if (this.quiz.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }*/
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = QuizMode.QUIZ;
    }
  }

  isAnswered(question: Question): boolean {
    return !!question.options.find(x => x.selected);
  }

  isCorrect(question: Question): boolean {
    return question.options.every(x => {
      return (x.selected && x.selected === x.isAnswer) || (!x.selected && !x.isAnswer);
    });
  }

  isSimpleChoice(question: Question): boolean {
    return question && question.questionType === QuestionType.SIMPLE;
  }

  getAnswers(question: Question) {
    return question.options
      .map(opt => {
        if (opt.isAnswer) {
          return opt.name;
        }
      })
      .filter(res => !!res);
  }

  onSubmit() {
    const answers = []; // TODO: type answers
    this.quiz.questions.forEach(x => answers.push({ quizId: this.quiz.id, questionId: x.id, answered: this.isAnswered(x) }));

    // TODO: Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = QuizMode.RESULT;
  }

  getDefaultConfig(): QuizConfig {
    return {
      allowMove: true,
      allowBack: true,
      allowReview: true,
      autoMove: false,
      showClock: true
    };
  }
}
