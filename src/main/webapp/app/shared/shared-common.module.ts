import { NgModule } from '@angular/core';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';
import { Data } from 'app/shared/models/data.model';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ColorPickerModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent],
  providers: [Data],
  exports: [ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent]
})
export class ProjetAbplSharedCommonModule {}
