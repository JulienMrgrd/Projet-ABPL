import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-modal-content',
  template: '<ng-content></ng-content>',
  exportAs: 'modalContent'
})
export class ModalContentComponent {
  constructor(protected activeModal: NgbActiveModal) {}

  close(result?: any): void {
    this.activeModal.close(result);
  }

  dismiss(reason?: any): void {
    this.activeModal.dismiss(reason);
  }
}
