import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Revision } from 'app/revision/shared/revision.model';
import { RevisionService } from 'app/revision/shared/services/revision.service';
import { Data } from 'app/shared/models/data.model';
import { JhiAlertService } from 'ng-jhipster';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['revision-list.css']
})
export class RevisionListComponent implements OnInit, OnDestroy {
  categoryId: string;
  categoryName: string;
  revisions: Revision[];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: JhiAlertService,
    private sharedData: Data,
    private revisionService: RevisionService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.categoryId = params['categoryId'];

      if (this.sharedData.revisionMenuName) {
        this.categoryName = this.sharedData.revisionMenuName;
      }

      this.revisionService
        .getRevisionsByCategory(this.categoryId)
        .then(revisions => {
          if (!revisions) {
            this.alertService.error('Catégorie inconnue');
          } else {
            this.revisions = revisions;
          }
        })
        .catch(() => this.alertService.error('Catégorie inconnue'));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
