import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResponseModalComponent } from 'app/quiz/quiz-reponses/quiz-response-modal/quiz-response-modal.component';
import { Option } from 'app/quiz/shared/option/option.model';
import { Question, QuestionUtils } from 'app/quiz/shared/question/question.model';
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
  testMode = false; // TODO enum ?
  quizModeEnum = QuizMode;
  mode = QuizMode.QUIZ;
  utils = QuestionUtils;
  config: QuizConfig = this.getDefaultConfig();
  currentQuestion: Question;
  validatedQuestions: string[] = [];

  pager = this.initPager();
  timer: any = null;
  startTime: Date;
  ellapsedTime = '00:00';

  routeDataSub: Subscription; // TODO: replace by takeUntil

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private sharedData: Data,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    const res1 = await this.quizService.getRandomizedQuiz();
    // debugger;

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
          duration: 5,
          showClock: true,
          autoMove: true,
          nbQuestions: 20,
          shuffleQuestions: true
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
      this.currentQuestion = this.quiz.questions[0];
      this.validatedQuestions = [];

      this.pager = this.initPager(this.quiz.questions.length);
      this.startTimer();
    });
  }

  reloadQuiz() {
    console.error('ON INIT ! Categ = ' + this.categoryName + ', quiz = ' + this.quizFilename);
    this.loadQuiz(this.categoryName, this.quizFilename);
  }

  private initPager(count = 1) {
    return {
      index: 0,
      count
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
      return answers.push({ quizId: this.quiz.id, questionId: x.id, answered: QuestionUtils.isAnswered(x) });
    });

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
