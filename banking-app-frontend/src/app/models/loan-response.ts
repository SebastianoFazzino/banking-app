export interface LoanResponse {
  requestedAmount?: number;
  allowedAmount?: number;
  loanTerm?: number;
  status?: 'APPROVED' | 'REJECTED';
}
