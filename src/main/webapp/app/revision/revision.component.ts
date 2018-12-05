import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-revision',
  templateUrl: './revision.component.html',
  styles: []
})
export class RevisionComponent implements OnInit, OnDestroy {

  private id: string;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params['id'];
      console.error(this.id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
