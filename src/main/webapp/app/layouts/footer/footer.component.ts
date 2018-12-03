import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LegalMentionsModalComponent } from 'app/layouts/footer/legal-mentions-modal/legal-mentions-modal.component';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.css']
})
export class FooterComponent {
  constructor(private modalService: NgbModal) {}

  openLegalMentionsDialog() {
    this.modalService.open(LegalMentionsModalComponent, { centered: true, size: 'lg' });
  }
}
