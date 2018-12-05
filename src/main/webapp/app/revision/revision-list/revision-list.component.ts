import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-revision-list',
  templateUrl: './revision-list.component.html',
  styles: []
})
export class RevisionListComponent implements OnInit, OnDestroy {

  private category: string;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.category = params['category'];
      console.error(this.category);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
