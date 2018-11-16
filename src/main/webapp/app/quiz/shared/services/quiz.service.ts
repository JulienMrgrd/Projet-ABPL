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

  async getQuizesByDirectory(category?: Category): Promise<Quiz[]> {
    // TODO: to promise with good type
    if (!category) {
      category = await this.getDefaultCategory();
    }

    const dirUrl = 'content/json/' + category.folder + '/';
    const jsons: string[] = await this.http.get<string[]>(dirUrl).toPromise();
    if (jsons && jsons.length > 0) {
      return await Promise.all(jsons.map(async json => await this.get(dirUrl + json)));
    }
    return Promise.reject('Empty directory : ' + category.folder);
  }

  async getDefaultCategory(): Promise<Category> {
    return (await this.getCategories())[0];
  }

  getCategories(): Promise<CategoriesInfo> {
    const jsonFile = 'content/json/categories.json';
    return this.http.get<CategoriesInfo>(jsonFile).toPromise();
  }

  async getCategoriesNameWithQuizes(): Promise<Map<string, Quiz[]>> {
    const categories = (await this.getCategories()).categories;
    const resMap = new Map<string, Quiz[]>();

    categories.forEach(async cat => {
      const quizes: Quiz[] = await this.getQuizesByDirectory(cat);
      resMap.set(cat.name, quizes); // TODO Parallelize all promises
      debugger;
    });

    return Promise.resolve(resMap);
  }
}
