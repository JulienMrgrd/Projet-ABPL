import { Injectable } from '@angular/core';
import { FileObject } from 'app/shared/models/file-object.model';

@Injectable()
export class Data {
  public choosenQuiz: FileObject;

  public constructor() {}

  public reset() {
    delete this.choosenQuiz;
  }
}
