import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ProjetAbplSharedLibsModule, ProjetAbplSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ProjetAbplSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  entryComponents: [JhiLoginModalComponent],
  exports: [ProjetAbplSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, ColorPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplSharedModule {}
