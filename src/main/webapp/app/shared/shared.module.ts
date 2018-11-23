import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, ProjetAbplSharedCommonModule, ProjetAbplSharedLibsModule } from './';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ProjetAbplSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  entryComponents: [JhiLoginModalComponent],
  exports: [ProjetAbplSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, ColorPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetAbplSharedModule {}
