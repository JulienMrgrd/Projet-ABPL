import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-legal-mentions-modal',
  templateUrl: './legal-mentions-modal.component.html',
  styleUrls: ['legal-mentions-modal.css']
})
export class LegalMentionsModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
