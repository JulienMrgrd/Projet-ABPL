import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';
import {
  HasAnyAuthorityDirective,
  JhiLoginModalComponent,
  ModalContentComponent,
  ProjetAbplSharedCommonModule,
  ProjetAbplSharedLibsModule
} from './';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ProjetAbplSharedCommonModule],
  declarations: [JhiLoginModalComponent, ModalContentComponent, HasAnyAuthorityDirective],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  entryComponents: [JhiLoginModalComponent, ModalContentComponent],
  exports: [ProjetAbplSharedCommonModule, JhiLoginModalComponent, ModalContentComponent, HasAnyAuthorityDirective, ColorPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplSharedModule {}
