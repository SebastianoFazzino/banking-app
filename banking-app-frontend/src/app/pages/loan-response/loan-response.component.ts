import {Component, OnInit} from '@angular/core';
import {LoanResponse} from "../../models/loan-response";
import {LoanService} from "../../services/loan.service";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan-response',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './loan-response.component.html',
  styleUrl: './loan-response.component.scss'
})
export class LoanResponseComponent implements OnInit {

  protected loanResponse: LoanResponse | null = null;
  protected errorMessage : string | null = null;
  protected warningMessage : string | null = null;
  protected successMessage : string | null = null;

  constructor(
    private loanService: LoanService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loanService.currentLoanResponse
      .subscribe(loanResponse => this.loanResponse = loanResponse);

    if (!this.loanResponse
      || !this.loanResponse.status
    ) {

      this.router.navigate(['/loan-request']).then(() => {});
      return;
    }

    if ( this.loanResponse.status === 'REJECTED' ) {
      this.errorMessage = 'Your loan request has been rejected';
      return;
    }

    if ( !this.loanResponse.requestedAmount
      || !this.loanResponse.allowedAmount
      || !this.loanResponse.requestedLoanTerm
      || !this.loanResponse.allowedLoanTerm
    ) {
      this.errorMessage = 'Invalid loan response, please try again later';
      return;
    }

    const { status , requestedAmount, allowedAmount, requestedLoanTerm, allowedLoanTerm } = this.loanResponse;
    const durationDifference : number = Math.abs(requestedLoanTerm - allowedLoanTerm);
    const amountDifference : string = Math.abs(requestedAmount - allowedAmount).toFixed(2);


    if (allowedAmount > requestedAmount) {
      this.successMessage = `Based on your credit score, you can borrow up to
      €${amountDifference} more than you requested`;
    }

    if (requestedAmount > allowedAmount) {

      if ( durationDifference > 0 ) {
        this.warningMessage = `Your loan request has been partially approved, you can borrow
        €${amountDifference} less than you requested and your loan term has been prolonged by
        ${durationDifference} months`;
        return;
      }

      this.warningMessage = `Your loan request has been partially approved, you can borrow
      €${amountDifference} less than you requested`;
    }
  }


  submitNewRequest() {
    this.router.navigate(['/loan-request']).then(() => {});
  }
}
