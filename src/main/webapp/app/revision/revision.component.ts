import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Revision } from 'app/revision/shared/revision.model';
import { RevisionService } from 'app/revision/shared/services/revision.service';
import { ContentUtil } from 'app/shared/util/content-util';
import { JhiAlertService } from 'ng-jhipster';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-revision',
  templateUrl: './revision.component.html',
  styles: []
})
export class RevisionComponent implements OnInit, OnDestroy {
  id: string;
  revision: Revision;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private alertService: JhiAlertService, private revisionService: RevisionService) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params['id'];
      console.error(this.id);

      this.revisionService
        .getRevisionById(this.id)
        .then(revision => {
          if (!revision) {
            this.alertService.error('Identifiant inconnu');
          } else {
            this.revision = revision;
          }
        })
        .catch(() => this.alertService.error('Identifiant inconnu'));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPdfUrl(src: string): string {
    return ContentUtil.getPdfUrl(src);
  }
}
