package com.banking.app.models;

import com.banking.app.models.enums.DecisionEngineStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanResponse {

    private Double requestedAmount;

    private Double allowedAmount;

    private Integer requestedLoanTerm;

    private Integer allowedLoanTerm;

    private DecisionEngineStatus status;

    public void rejectRequest() {
        this.status = DecisionEngineStatus.REJECTED;
    }
}
