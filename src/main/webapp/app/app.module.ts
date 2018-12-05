import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProjetAbplCoreModule } from 'app/core';
import { ProjetAbplQuizModule } from 'app/quiz/quiz.module';
import { ProjetAbplRevisionModule } from 'app/revision/revision.module';
import { ProjetAbplSharedModule } from 'app/shared';
import * as moment from 'moment';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ProjetAbplAccountModule } from './account/account.module';
import { ProjetAbplAppRoutingModule } from './app-routing.module';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ProjetAbplEntityModule } from './entities/entity.module';
import { ProjetAbplHomeModule } from 'app/home';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent } from './layouts';
import './vendor.ts';
import { LegalMentionsModalComponent } from './layouts/footer/legal-mentions-modal/legal-mentions-modal.component';

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
    ProjetAbplQuizModule,
    ProjetAbplRevisionModule
    // TODO Create a FooterModule
  ],
  entryComponents: [LegalMentionsModalComponent],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, FooterComponent, LegalMentionsModalComponent],
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
