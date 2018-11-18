import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { NamedObject } from 'app/shared/models/named-object.model';
import { CategoriesInfo } from 'app/quiz/shared/categories-info/categories-info.model';
import { Category } from 'app/quiz/shared/categories-info/categories-info.model';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      { id: 'content/json/comportement/n2_comportement.json', name: 'Moyen' },
      { id: 'content/json/comportement/n3_comportement.json', name: 'Facile' },
      { id: 'content/json/comportement/n1_comportement.json', name: 'Difficile' }
    ];
  }

  getQuizesByDirectory(category: Category): Promise<Quiz[]> {
    const dirUrl = 'content/json/' + category.folder + '/';
    return this.http
      .get<string[]>(dirUrl)
      .toPromise()
      .then(jsons => {
        return Promise.all(jsons.map(json => this.get(dirUrl + json)));
      });
  }

  getQuizesInfoByDirectory(category: Category): Promise<NamedObject[]> {
    const dirUrl = 'content/json/' + category.folder + '/';
    return this.http
      .get<string[]>(dirUrl)
      .toPromise()
      .then(jsons => {
        return Promise.all(
          jsons.map(json => {
            return this.get(dirUrl + json).then(quiz => {
              return { id: quiz.id, name: quiz.name } as NamedObject;
            });
          })
        );
      });
  }

  getDefaultCategory(): Promise<Category> {
    return this.getCategoriesInfo()[0];
  }

  getCategoriesInfo(): Promise<CategoriesInfo> {
    const jsonFile = 'content/json/categories.json';
    return this.http.get<CategoriesInfo>(jsonFile).toPromise();
  }

  getCategoriesNameWithQuizes(): Promise<Map<Category, NamedObject[]>> {
    return this.getCategoriesInfo().then(async (info: CategoriesInfo) => {
      const resMap = new Map<Category, NamedObject[]>();

      const putQuizesIntoMap = function(cat: Category, $this) {
        $this.getQuizesInfoByDirectory(cat).then(quizes => resMap.set(cat, quizes));
      };

      return await Promise.all(info.categories.map(cat => Promise.resolve(putQuizesIntoMap(cat, this)))).then(() => resMap);
    });
  }
}
