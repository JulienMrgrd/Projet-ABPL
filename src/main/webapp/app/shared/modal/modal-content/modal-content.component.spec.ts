import { Component } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { click } from '@atlas-libs/testing';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbModule } from '../../core/custom-ngb.module';
import { ModalContentComponent } from './modal-content.component';

@Component({
  selector: 'nvg-test-modal',
  template: `
    <button type="button" id="close" (click)="close('test')"></button>
    <button type="button" id="dismiss" (click)="dismiss('test')"></button>
  `
})
class TestModalComponent extends ModalContentComponent {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }
}
/* tslint:enable:no-access-missing-member */

@Component({
  selector: 'nvg-modal-content-host',
  template: `
    <nvg-modal-content #modalContent>
      <button type="button" id="close" (click)="modalContent.close('test')"></button>
      <button type="button" id="dismiss" (click)="modalContent.dismiss('test')"></button>
    </nvg-modal-content>
  `
})
class ModalContentHostComponent {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-cmpt',
  template: `
    <div id="testContainer"></div>
    <button id="open" (click)="open('from button')">Open</button>
  `
})
class TestComponent {
  name = 'World';
  openedModal: NgbModalRef;
  show = true;

  constructor(private modalService: NgbModal) {}

  open(content: any, options?: Object) {
    this.openedModal = this.modalService.open(content, options);
    return this.openedModal;
  }
  close() {
    if (this.openedModal) {
      this.openedModal.close('ok');
    }
  }
  openCmpt(cmptType: any, options?: Object) {
    return this.modalService.open(cmptType, options);
  }
}

describe('ModalContentComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomNgbModule],
      declarations: [ModalContentComponent, ModalContentHostComponent, TestComponent, TestModalComponent],
      providers: [NgbActiveModal]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalContentHostComponent, TestModalComponent]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([NgbModal], (_modalService: NgbModal) => {
    modalService = _modalService;
  }));

  describe('(with host)', () => {
    it('should permit to close the modal if opened', async () => {
      const ref = fixture.componentInstance.openCmpt(ModalContentHostComponent);
      fixture.detectChanges();
      const closeBtn = document.querySelector('#close') as HTMLElement;
      click(closeBtn);
      fixture.detectChanges();
      try {
        const rslt = await ref.result;
        expect(rslt).toBe('test');
      } catch (e) {
        console.error(e);
        fail('should not fail');
      }
    });

    it('should permit to dismiss the modal if opened', done => {
      const ref = fixture.componentInstance.openCmpt(ModalContentHostComponent);
      fixture.detectChanges();
      ref.result.then(
        () => {
          fail('should not succeed');
        },
        rslt => {
          expect(rslt).toBe('test');
          done();
        }
      );
      const closeBtn = document.querySelector('#dismiss') as HTMLElement;
      click(closeBtn);
      fixture.detectChanges();
    });
  });

  describe('(with inheritance)', () => {
    it('should permit to close the modal if opened', done => {
      const ref = fixture.componentInstance.openCmpt(TestModalComponent);
      fixture.detectChanges();
      ref.result.then(
        rslt => {
          expect(rslt).toBe('test');
          done();
        },
        () => {
          fail('should not fail');
        }
      );
      const closeBtn = document.querySelector('#close') as HTMLElement;
      click(closeBtn);
      fixture.detectChanges();
    });

    it('should permit to dismiss the modal if opened', done => {
      const ref = fixture.componentInstance.openCmpt(TestModalComponent);
      fixture.detectChanges();
      ref.result.then(
        () => {
          fail('should not succeed');
        },
        rslt => {
          expect(rslt).toBe('test');
          done();
        }
      );
      const closeBtn = document.querySelector('#dismiss') as HTMLElement;
      click(closeBtn);
      fixture.detectChanges();
    });
  });
});
