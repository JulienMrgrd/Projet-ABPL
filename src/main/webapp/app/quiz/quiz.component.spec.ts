import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [QuizComponent],
        providers: [],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents()
        .catch(fail);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
