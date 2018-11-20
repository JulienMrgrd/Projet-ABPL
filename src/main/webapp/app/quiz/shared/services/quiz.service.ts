import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { NamedObject } from 'app/shared/models/named-object.model';
import { CategoriesInfo } from 'app/quiz/shared/categories-info/categories-info.model';
import { Category } from 'app/quiz/shared/categories-info/categories-info.model';
import { FileObject } from 'app/shared/models/file-object.model';

@Injectable()
export class QuizService {
  constructor(private http: HttpClient) {}

  get(url: string): Promise<Quiz> {
    return this.http.get<Quiz>(url).toPromise();
  }

  getQuiz(category: Category, fileName: string): Promise<Quiz> {
    return this.getQuizByNames(category.folder, fileName);
  }

  getQuizByNames(categoryName: string, fileName: string): Promise<Quiz> {
    const url = 'content/json/' + categoryName + '/' + fileName;
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

  /** TODO and FIXME: use DB !! */
  getQuizesInfoByDirectory(category: Category): Promise<FileObject[]> {
    const dirUrl = 'content/json/' + category.folder + '/';
    return this.http
      .get<string[]>(dirUrl)
      .toPromise()
      .then(jsons => {
        if (!jsons || jsons.length === 0) {
          console.error('Cannot list files in : ' + dirUrl);
          jsons = ['n1_' + category.folder + '.json']; // TODO: load other files
        }

        return Promise.all(
          jsons.map(json => {
            return this.get(dirUrl + json).then(quiz => {
              return { id: quiz.id, name: quiz.name, filename: json } as FileObject;
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

  getCategoriesNameWithQuizes(): Promise<Map<Category, FileObject[]>> {
    return this.getCategoriesInfo().then(async (info: CategoriesInfo) => {
      const resMap = new Map<Category, FileObject[]>();

      const putQuizesIntoMap = function(cat: Category, $this) {
        $this.getQuizesInfoByDirectory(cat).then(quizes => resMap.set(cat, quizes));
      };

      return await Promise.all(info.categories.map(cat => Promise.resolve(putQuizesIntoMap(cat, this)))).then(() => resMap);
    });
  }
}
