import { NgModule } from '@angular/core';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ColorPickerModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent],
  exports: [ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent]
})
export class ProjetAbplSharedCommonModule {}
