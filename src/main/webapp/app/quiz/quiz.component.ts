import { Component, OnDestroy, OnInit } from '@angular/core';
import { Option } from 'app/quiz/shared/option/option.model';
import { QuestionType } from 'app/quiz/shared/question-type/question-type.enum';
import { Question } from 'app/quiz/shared/question/question.model';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
import { NamedObject } from 'app/shared/models/named-object.model';
import { TimeUtil } from 'app/shared/util/time-util';

@Component({
  selector: 'jhi-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  quizId: string;

  // template values
  quizModeEnum = QuizMode;
  quizes: NamedObject[];
  mode = QuizMode.QUIZ;

  pager = this.initPager();
  timer: any = null;
  startTime: Date;
  ellapsedTime = '00:00';

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizes = this.quizService.getQuizesInfo();
    this.quizId = this.quizes[0].id;
    this.loadQuiz(this.quizId);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  loadQuiz(quizId: string) {
    this.quizService.get(quizId).then((quiz: Quiz) => {
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
    this.loadQuiz(this.quizId ? this.quizId : this.quizes[0].id);
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
}
