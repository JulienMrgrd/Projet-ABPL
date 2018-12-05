import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResponseModalComponent } from 'app/quiz/quiz-reponses/quiz-response-modal/quiz-response-modal.component';
import { Option } from 'app/quiz/shared/option/option.model';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';
import { QuizConfig } from 'app/quiz/shared/quiz/quiz-config.model';
import { QuizMode, QuizStepMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { ContentUtil } from 'app/shared/util/content-util';
import { FormatUtil } from 'app/shared/util/format-util';
import Timer = NodeJS.Timer;

@Component({
  selector: 'jhi-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnChanges, OnDestroy {
  @Input()
  quiz: Quiz;

  @Input()
  config: QuizConfig;

  @Input()
  quizMode: QuizMode = QuizMode.TRAINING;

  @Output()
  restart = new EventEmitter<void>();

  // template values
  quizModeEnum = QuizStepMode;
  actualStepMode = QuizStepMode.QUIZ;
  currentQuestion: Question;

  // results
  correctAnswers = 0;
  goodPercent = 0;

  // tools (page, counter, utils, ...)
  utils = QuestionUtils;
  formatUtil = FormatUtil;
  pager = this.initPager();
  counter = 300;

  private timer: Timer;
  private validatedQuestions: string[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.quiz && this.config) {
      this.startQuiz();
    }
  }

  ngOnDestroy() {
    this.clearAll();
  }

  startQuiz() {
    if (this.quiz) {
      this.actualStepMode = QuizStepMode.QUIZ;

      // default values
      this.quiz.questions.forEach(question => question.options.forEach(opt => (opt.selected = false)));
      this.currentQuestion = this.quiz.questions[0];
      this.validatedQuestions = [];

      this.pager = this.initPager(this.quiz.questions.length);

      if (this.config.showClock) {
        this.startTimer();
      }
    }
  }

  restartQuiz() {
    this.clearAll();
    this.restart.emit();
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
    const answers = []; // TODO: type answers
    this.quiz.questions.forEach(x => {
      this.correctAnswers = this.correctAnswers + +QuestionUtils.isCorrect(x); // cast boolean to numbers
      return answers.push({ quizId: this.quiz.id, questionId: x.id, answered: QuestionUtils.isAnswered(x) });
    });

    this.goodPercent = (this.correctAnswers / this.quiz.questions.length) * 100;
    if (this.goodPercent > 100) {
      // by security
      console.error('Percent > 100');
      console.error(this.quiz);
      console.error(this.correctAnswers);
      this.goodPercent = 100;
    }

    // TODO: Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.actualStepMode = QuizStepMode.RESULT;
  }

  isValidated(question: Question): boolean {
    return this.validatedQuestions.includes(question.id);
  }

  validate(question: Question) {
    this.validatedQuestions.push(question.id);

    const modalRef = this.modalService.open(QuizResponseModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.question = question;
    modalRef.componentInstance.index = this.pager.index;
    modalRef.componentInstance.mode = this.quizMode;
    modalRef.result.then(() => this.goToNext(), () => this.goToNext());
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.currentQuestion = this.quiz.questions[index];
      this.actualStepMode = QuizStepMode.QUIZ; // display the question by changing the mode
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

  private initPager(count = 1) {
    return {
      index: 0,
      count
    };
  }

  get isTestMode(): boolean {
    return this.quizMode === QuizMode.TEST;
  }

  getMediaUrl(imageFilename: string) {
    return ContentUtil.getMediaUrl(imageFilename, this.quizMode);
  }
}
