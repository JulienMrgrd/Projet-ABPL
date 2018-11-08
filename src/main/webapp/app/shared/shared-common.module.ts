import { NgModule } from '@angular/core';

import { ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ProjetAbplSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ProjetAbplSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ProjetAbplSharedCommonModule {}
