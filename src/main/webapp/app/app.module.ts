import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ProjetAbplSharedModule } from 'app/shared';
import { ProjetAbplCoreModule } from 'app/core';
import { ProjetAbplQuizModule } from 'app/quiz/quiz.module';
import { ProjetAbplAppRoutingModule } from './app-routing.module';
import { ProjetAbplHomeModule } from './home/home.module';
import { ProjetAbplAccountModule } from './account/account.module';
import { ProjetAbplEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, ErrorComponent, ColorChooserComponent } from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    ProjetAbplAppRoutingModule,
    Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
    ProjetAbplSharedModule,
    ProjetAbplCoreModule,
    ProjetAbplHomeModule,
    ProjetAbplAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ProjetAbplEntityModule,
    ProjetAbplQuizModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, FooterComponent, ColorChooserComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class ProjetAbplAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
