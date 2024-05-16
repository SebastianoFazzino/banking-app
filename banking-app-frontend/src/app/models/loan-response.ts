export interface LoanResponse {
  requestedAmount?: number;
  allowedAmount?: number;
  requestedLoanTerm?: number;
  allowedLoanTerm?: number;
  status?: 'APPROVED' | 'REJECTED';
}
