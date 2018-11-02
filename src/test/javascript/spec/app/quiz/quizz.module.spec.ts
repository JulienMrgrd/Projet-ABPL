import { ProjetAbplQuizModule } from 'app/quiz/quiz.module';

describe('ProjetAbplQuizModule', () => {
  let projetAbplQuizModule: ProjetAbplQuizModule;

  beforeEach(() => {
    projetAbplQuizModule = new ProjetAbplQuizModule();
  });

  it('should create an instance', () => {
    expect(projetAbplQuizModule).toBeTruthy();
  });
});
