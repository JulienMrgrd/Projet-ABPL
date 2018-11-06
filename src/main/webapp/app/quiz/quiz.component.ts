import { Component, OnDestroy, OnInit } from '@angular/core';
import { Option } from 'app/quiz/shared/option/option';
import { Question } from 'app/quiz/shared/question/question';
import { Quiz } from 'app/quiz/shared/quiz/quiz';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode';
import { QuizService } from 'app/quiz/shared/services/quiz.service';
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
  quizes: any[];
  mode = QuizMode.QUIZ;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
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
    this.quizService.get(quizId).then(quiz => {
      this.quiz = quiz;
      this.mode = QuizMode.QUIZ;
      this.pager.count = this.quiz.questions.length;

      this.startTimer();
    });
  }

  reloadQuiz() {
    this.loadQuiz(this.quizId ? this.quizId : this.quizes[0].id);
  }

  private startTimer() {
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

  onSelect(question: Question, option: Option) {
    if (question.isMulitpleChoice) {
      question.options.forEach(x => {
        if (x.id !== option.id) {
          x.selected = false;
        }
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
    return question.options.every(x => x.selected === x.isAnswer);
  }

  onSubmit() {
    const answers = []; // TODO: type answers
    this.quiz.questions.forEach(x => answers.push({ quizId: this.quiz.id, questionId: x.id, answered: x.answered }));

    // TODO: Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = QuizMode.RESULT;
  }
}
