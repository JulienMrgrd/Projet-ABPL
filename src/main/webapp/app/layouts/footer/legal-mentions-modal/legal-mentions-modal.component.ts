import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-legal-mentions-modal',
  templateUrl: './legal-mentions-modal.component.html',
  styles: []
})
export class LegalMentionsModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
