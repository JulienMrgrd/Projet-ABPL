import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from 'app/quiz/shared/quiz/quiz';
import { NamedObject } from 'app/shared/models/named-object.model';

@Injectable()
export class QuizService {
  constructor(private http: HttpClient) {}

  get(url: string): Promise<Quiz> {
    return this.http.get<Quiz>(url).toPromise();
  }

  /**
   * TODO: not hard coded files
   */
  getQuizesInfo(): NamedObject[] {
    return [
      { id: 'content/json/moyen.json', name: 'Moyen' },
      { id: 'content/json/facile.json', name: 'Facile' },
      { id: 'content/json/difficile.json', name: 'Difficile' }
    ];
  }
}
