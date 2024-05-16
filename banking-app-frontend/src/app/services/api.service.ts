import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanRequest} from "../models/loan-request";
import {Observable} from "rxjs";
import {LoanResponse} from "../models/loan-response";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  requestLoan(loanRequest: LoanRequest): Observable<LoanResponse> {
    const url : string = "http://localhost:8080/v1/banking/request-loan";
    return this.http.post<LoanResponse>(url, loanRequest);
  }

}
