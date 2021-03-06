import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSON_URL, TEST_DIR } from 'app/app.constants';
import { CategoriesInfo, Category } from 'app/quiz/shared/categories-info/categories-info.model';
import { Quiz } from 'app/quiz/shared/quiz/quiz.model';
import { FileObject } from 'app/shared/models/file-object.model';

@Injectable()
export class QuizService {
  INFO_FILENAME = 'categories.json';
  TEST_FILENAME = 'test.json';

  constructor(private http: HttpClient) {}

  getQuizByUrl(url: string): Promise<Quiz> {
    return this.http.get<Quiz>(url).toPromise();
  }

  getQuiz(category: Category, fileName: string): Promise<Quiz> {
    return this.getQuizByNames(category.folder, fileName);
  }

  getCategoriesInfo(): Promise<CategoriesInfo> {
    const jsonFile = JSON_URL + this.INFO_FILENAME;
    return this.http.get<CategoriesInfo>(jsonFile).toPromise();
  }

  getQuizByNames(categoryName: string, fileName: string): Promise<Quiz> {
    const url = JSON_URL + categoryName + '/' + fileName;
    return this.http.get<Quiz>(url).toPromise();
  }

  getTest(): Promise<Quiz> {
    const url = JSON_URL + TEST_DIR + this.TEST_FILENAME;
    return this.http.get<Quiz>(url).toPromise();
  }

  /** TODO and FIXME: use DB !! */
  getQuizesInfoByCategory(category: Category): Promise<FileObject[]> {
    const dirUrl = JSON_URL + category.folder + '/';
    return Promise.all(
      category.files.map(json => {
        return this.getQuizByUrl(dirUrl + json).then(quiz => {
          return { id: quiz.id, name: quiz.name, filename: json } as FileObject;
        });
      })
    );
  }

  getQuizesByCategory(category: Category): Promise<Quiz[]> {
    const dirUrl = JSON_URL + category.folder + '/';
    return Promise.all(category.files.map(json => this.getQuizByUrl(dirUrl + json))) as Promise<Quiz[]>;
  }

  getCategoriesNameWithQuizes(): Promise<Map<Category, FileObject[]>> {
    return this.getCategoriesInfo().then((info: CategoriesInfo) => {
      const resMap = new Map<Category, FileObject[]>();

      const putQuizesIntoMap = (cat: Category): Promise<any> => {
        return this.getQuizesInfoByCategory(cat).then(quizes => resMap.set(cat, quizes));
      };

      return Promise.all(info.categories.map(cat => Promise.resolve(putQuizesIntoMap(cat)))).then(() => resMap);
    });
  }

  getQuizFilename(categoryName: string): Promise<string> {
    return this.getCategoriesInfo().then((info: CategoriesInfo) => {
      const categ = info.categories.find(cat => cat.folder === categoryName);
      return categ && categ.folder && categ.folder.length > 0 ? categ.files[0] : null;
    });
  }
}
