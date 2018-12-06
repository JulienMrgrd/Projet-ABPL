import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevisionComponent } from 'app/revision/revision.component';
import { revisionState } from 'app/revision/revision.route';
import { RevisionService } from 'app/revision/shared/services/revision.service';
import { ProjetAbplSharedModule } from 'app/shared';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RevisionListComponent } from './revision-list/revision-list.component';

@NgModule({
  imports: [ProjetAbplSharedModule, RouterModule.forChild(revisionState), PdfViewerModule],
  declarations: [
    RevisionComponent,
    RevisionListComponent
  ],
  providers: [
    RevisionService
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplRevisionModule { }
