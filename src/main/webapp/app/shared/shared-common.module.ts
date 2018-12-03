import { NgModule } from '@angular/core';
import { ColorPickerComponent } from 'app/shared/color-picker/color-picker.component';
import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';
import { Data } from 'app/shared/models/data.model';

@NgModule({
  imports: [ProjetAbplSharedLibsModule, ColorPickerModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent, FormatTimePipe],
  providers: [Data],
  exports: [ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, ColorPickerComponent, FormatTimePipe]
})
export class ProjetAbplSharedCommonModule {}
