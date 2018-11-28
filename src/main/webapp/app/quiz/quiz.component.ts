import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResponseModalComponent } from 'app/quiz/quiz-reponses/quiz-response-modal/quiz-response-modal.component';
import { Option } from 'app/quiz/shared/option/option.model';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { Data } from 'app/shared/models/data.model';
import { Subscription } from 'rxjs';
import { QuizConfig } from 'app/quiz/shared/quiz/quiz-config.model';
import Timer = NodeJS.Timer;

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
  testMode = false; // TODO enum ?
  quizModeEnum = QuizMode;
  mode = QuizMode.QUIZ;
  utils = QuestionUtils;
  config: QuizConfig;
  currentQuestion: Question;
  validatedQuestions: string[] = [];

  // results
  correctAnswers = 0;
  goodPercent = 0;

  pager = this.initPager();
  timer: Timer;
  counter = 300;

  routeDataSub: Subscription; // TODO: replace by takeUntil

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private sharedData: Data,
    private modalService: NgbModal
  ) {}

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
        // TODO: DETECT TEST mode (data.config, url, ...), and load config
        this.testMode = true;
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
      } else {
        this.config = this.getDefaultConfig();
      }

      this.loadQuiz(this.categoryName, this.quizFilename);
    });
  }

  ngOnDestroy() {
    console.error('ON DESTROY ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
    this.clearAll();
    this.sharedData.reset();
    this.routeDataSub.unsubscribe(); // TODO: TakeUntil
  }

  loadQuiz(categoryName: string, quizFilename: string) {
    this.quizService.getQuizByNames(categoryName, quizFilename).then((quiz: Quiz) => {
      this.quiz = quiz;
      this.mode = QuizMode.QUIZ;

      // default values
      this.quiz.questions.forEach(question => question.options.forEach(opt => (opt.selected = false)));
      this.currentQuestion = this.quiz.questions[0];
      this.validatedQuestions = [];

      this.pager = this.initPager(this.quiz.questions.length);

      if (this.config.showClock) {
        this.startTimer();
      }
    });
  }

  reloadQuiz() {
    console.error('ON RELOAD ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
    this.clearAll();
    this.loadQuiz(this.categoryName, this.quizFilename);
  }

  private initPager(count = 1) {
    return {
      index: 0,
      count
    };
  }

  private startTimer() {
    if (this.timer) {
      this.clearAll();
    }

    if (this.config.duration) {
      this.counter = this.config.duration * 60;
    }
    this.timer = setInterval(() => {
      // every second
      this.config.countdown ? --this.counter : ++this.counter;
      if (this.counter === 0) {
        this.onSubmit();
      }
    }, 1000);
  }

  /**
   * Unselect all others options (radio buttons) for this question, except the given one.
   */
  onSelect($event, question: Question, response: Option) {
    if ($event.target.checked && QuestionUtils.isSimpleChoice(question)) {
      question.options.forEach(opt => {
        opt.selected = opt.id === response.id;
      });
    }

    /*if (this.quiz.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }*/
  }

  onSubmit() {
    this.clearAll();
    const answers = []; // TODO: type answers
    this.quiz.questions.forEach(x => {
      this.correctAnswers = this.correctAnswers + +QuestionUtils.isCorrect(x); // cast boolean to numbers
      return answers.push({ quizId: this.quiz.id, questionId: x.id, answered: QuestionUtils.isAnswered(x) });
    });

    this.goodPercent = (this.correctAnswers / this.quiz.questions.length) * 100;

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
      showClock: false,
      countdown: false
    };
  }

  isValidated(question: Question): boolean {
    return this.validatedQuestions.includes(question.id);
  }

  validate(question: Question) {
    this.validatedQuestions.push(question.id);

    const modalRef = this.modalService.open(QuizResponseModalComponent, { centered: true });
    modalRef.componentInstance.question = question;
    modalRef.result.then(() => this.goToNext(), () => this.goToNext());
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.currentQuestion = this.quiz.questions[index];
      this.mode = QuizMode.QUIZ; // display the question by changing the mode
    }
  }

  clearAll() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.correctAnswers = 0;
    this.goodPercent = 0;
    this.validatedQuestions = [];
    this.counter = 0;
  }

  goToNext() {
    this.isLastPos() ? this.onSubmit() : this.goTo(this.pager.index + 1);
  }

  isLastPos() {
    return this.pager.index === this.pager.count - 1;
  }

  isFirstPos() {
    return this.pager.index === 0;
  }
}

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }
}
