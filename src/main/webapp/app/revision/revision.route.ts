import { Routes } from '@angular/router';
import { RevisionListComponent } from 'app/revision/revision-list/revision-list.component';
import { RevisionComponent } from 'app/revision/revision.component';

export const revisionState: Routes = [
  {
    path: 'revision',
    children: [
      {
        path: 'list/:category',
        component: RevisionListComponent,
      },
      {
        path: ':id',
        component: RevisionComponent,
      },
    ]
  }
];
