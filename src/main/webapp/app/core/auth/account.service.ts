import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { DISABLED_BACK, SERVER_API_URL } from 'app/app.constants';
import { Account } from 'app/core/user/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  get(): Observable<HttpResponse<Account>> {
    if (DISABLED_BACK) {
      return throwError('DISABLED_BACK');
    }
    return this.http.get<Account>(SERVER_API_URL + 'api/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + 'api/account', account, { observe: 'response' });
  }
}
