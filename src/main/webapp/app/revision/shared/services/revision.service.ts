import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSON_URL } from 'app/app.constants';
import { Revision } from 'app/revision/shared/revision.model';
import { NamedObject } from 'app/shared/models/named-object.model';

@Injectable()
export class RevisionService {
  INFO_FILENAME = 'revisions.json';

  constructor(private http: HttpClient) {}

  getRevisionById(id: string): Promise<Revision> {
    const jsonFile = JSON_URL + this.INFO_FILENAME;
    return this.http
      .get(jsonFile)
      .toPromise()
      .then((revisions: Revision[]) => {
        if (!revisions) return null;
        return revisions.find(rev => rev.id === id);
      });
  }

  getRevisionsByCategory(category: string): Promise<Revision[]> {
    const jsonFile = JSON_URL + this.INFO_FILENAME;
    return this.http
      .get(jsonFile)
      .toPromise()
      .then((revisions: Revision[]) => {
        if (!revisions) return [];
        return revisions.filter(rev => rev.category_id === category);
      });
  }

  getRevisionsCategories(): Promise<Set<NamedObject>> {
    const jsonFile = JSON_URL + this.INFO_FILENAME;
    return this.http
      .get(jsonFile)
      .toPromise()
      .then((revisions: Revision[]) => {
        if (!revisions) return new Set();
        const categories = new Set<NamedObject>();
        const forEachCategs: string[] = [];
        revisions.forEach(rev => {
          if (!forEachCategs.includes(rev.category_name)) {
            categories.add({
              name: rev.category_name,
              id: rev.category_id
            });
            forEachCategs.push(rev.category_name);
          }
        });
        return categories;
      });
  }
}
