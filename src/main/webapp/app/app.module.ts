import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProjetAbplCoreModule } from 'app/core';
import { ProjetAbplHomeModule } from 'app/home';
import { ProjetAbplSharedModule } from 'app/shared';
import * as moment from 'moment';
import { JhiEventManager } from 'ng-jhipster';
import { LocalStorageService, Ng2Webstorage, SessionStorageService } from 'ngx-webstorage';
import { ProjetAbplAccountModule } from './account/account.module';
import { ProjetAbplAppRoutingModule } from './app-routing.module';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ProjetAbplEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent } from './layouts';
import './vendor.ts';

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
        ProjetAbplEntityModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class ProjetAbplAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
