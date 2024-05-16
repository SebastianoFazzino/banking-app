export interface LoanRequest {
  personalCode: string;
  requestedAmount?: number | null;
  durationInMonths?: number | null;
}
