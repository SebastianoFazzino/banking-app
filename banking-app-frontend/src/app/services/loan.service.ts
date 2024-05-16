// src/app/services/loan.service.ts

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { LoanResponse } from '../models/loan-response';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private loanResponseSource : BehaviorSubject<LoanResponse | null> =
    new BehaviorSubject<LoanResponse | null>(null);
  currentLoanResponse : Observable<LoanResponse | null> =
    this.loanResponseSource.asObservable();

  constructor() { }

  changeLoanResponse(loanResponse: LoanResponse) : void {
    this.loanResponseSource.next(loanResponse);
  }
}
