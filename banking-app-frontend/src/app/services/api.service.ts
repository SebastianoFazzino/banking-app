import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoanRequest} from "../models/loan-request";
import {Observable} from "rxjs";
import {LoanResponse} from "../models/loan-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  requestLoan(loanRequest: LoanRequest): Observable<LoanResponse> {
    const url : string = environment.apiUrl;
    return this.http.post<LoanResponse>(url, loanRequest);
  }

}
