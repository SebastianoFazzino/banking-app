import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {LoanRequest} from "../../models/loan-request";
import {LoanResponse} from "../../models/loan-response";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {delay} from "rxjs";
import {LoanService} from "../../services/loan.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss'
})
export class LoanFormComponent {

  protected loanRequest: LoanRequest = {
    personalCode: '',
    requestedAmount: null,
    durationInMonths: null
  }

  protected loanResponse: LoanResponse = {};

  protected errorMessages: string[] = [];
  protected isAmountFocused: boolean = false;
  protected isDurationFocused: boolean = false;
  protected isRequestExecuting: boolean = false;

  constructor(
    private apiService: ApiService,
    private loanService: LoanService,
    private router: Router
  ) {}

  clearErrors(): void {
    this.errorMessages = [];
  }

  submitRequest() : void {

    this.clearErrors();

    // Check if requestedAmount is a number
    if (this.loanRequest.requestedAmount && isNaN(this.loanRequest.requestedAmount)) {
      this.errorMessages.push('Requested amount must be a number');
    }

    // Check if durationInMonths is a number
    if (this.loanRequest.durationInMonths && isNaN(this.loanRequest.durationInMonths)) {
      this.errorMessages.push('Duration must be a number');
    }

    if ( this.errorMessages.length > 0 ) {
      return;
    }

    this.isRequestExecuting = true; // Set loading state to true

    this.apiService.requestLoan(this.loanRequest)
      .pipe(delay(2000)) // Add 2 seconds delay to simulate the request
      .subscribe({

      next: (loanResponse: LoanResponse) : void => {

        this.isRequestExecuting = false;
        this.loanResponse = loanResponse;

        // Set the loan response data in the shared service
        // so that is accessible by loan response component
        this.loanService.changeLoanResponse(loanResponse);

        this.router.navigate(['/loan-response']).then(() => {});

        },
      // Handle error response
      error: (err: HttpErrorResponse) : void => {

        this.isRequestExecuting = false;
        this.errorMessages = [];

        if (err.error && typeof err.error === 'object') {
          if (err.error.validationErrors) {
            this.errorMessages = err.error.validationErrors;
          } else if (err.error.errorCode) {

            if (err.error.errorCode === 'client_not_found') {
              this.errorMessages.push('Invalid personal code');
            }
          } else if (err.error.message) {
            if (err.error.message.includes('Unknown Error')) {
              this.errorMessages.push(
                "An unknown error occurred. Please try again later."
              );
            } else {
              this.errorMessages.push(err.error.message);
            }
          }
        }
      }
    });
  }
}
