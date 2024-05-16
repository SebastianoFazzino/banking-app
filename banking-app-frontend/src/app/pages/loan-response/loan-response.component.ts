import {Component, OnInit} from '@angular/core';
import {LoanResponse} from "../../models/loan-response";
import {LoanService} from "../../services/loan.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan-response',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './loan-response.component.html',
  styleUrl: './loan-response.component.scss'
})
export class LoanResponseComponent implements OnInit {

  loanResponse: LoanResponse | null = null;

  constructor(
    private loanService: LoanService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loanService.currentLoanResponse
      .subscribe(loanResponse => this.loanResponse = loanResponse);

    if (!this.loanResponse) {
      this.loanResponse = {
        requestedAmount: 2000,
        allowedAmount: 20000,
        loanTerm: 18,
        status: 'APPROVED'
      }
    }
  }

  submitNewRequest() {
    this.router.navigate(['/loan-request']).then(() => {});
  }
}
