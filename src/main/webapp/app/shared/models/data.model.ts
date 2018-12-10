import { Injectable } from '@angular/core';
import { FileObject } from 'app/shared/models/file-object.model';

@Injectable()
export class Data {
  choosenQuiz: FileObject;
  revisionMenuName: string;

  constructor() {}

  reset() {
    delete this.choosenQuiz;
  }
}
