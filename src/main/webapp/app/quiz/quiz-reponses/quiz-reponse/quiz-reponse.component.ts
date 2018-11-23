import { Component, Input, OnInit } from '@angular/core';
import { QuestionType } from 'app/quiz/shared/question-type/question-type.enum';
import { Question } from 'app/quiz/shared/question/question.model';

@Component({
  selector: 'jhi-quiz-reponse',
  templateUrl: './quiz-reponse.component.html',
  styles: []
})
export class QuizReponseComponent implements OnInit {
  @Input()
  question: Question;

  @Input()
  index: number = -1;

  constructor() {}

  ngOnInit() {}

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
}
