package com.banking.app.services;

import com.banking.app.configurations.BankingConfiguration;
import com.banking.app.models.Client;
import com.banking.app.models.LoanResponse;
import com.banking.app.models.LoanRequest;
import com.banking.app.models.enums.ClientSegmentation;
import com.banking.app.models.enums.DecisionEngineStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Service
@RequiredArgsConstructor
public class DecisionEngineService {

    private final ClientService clientService;

    private final BankingConfiguration bankingConfiguration;

    public LoanResponse processLoanRequest(LoanRequest request) {

        log.info("Processing loan request: {}", request);

        Client client = clientService.getClientByPersonalCode(request.getPersonalCode());

        LoanResponse response = new LoanResponse();
        response.setRequestedAmount(request.getRequestedAmount());
        response.setRequestedLoanTerm(request.getDurationInMonths());

        if (client.getSegmentation().equals(ClientSegmentation.DEBT)) {
            log.info("Client {} is in debt, loan request rejected", client.getPersonalCode());
            response.rejectRequest();
            return response;
        }

        log.info("Client {} segmentation: {}, calculating allowed loan amount",
                client.getPersonalCode(), client.getSegmentation());

        double creditModifier = client.getCreditModifier() != null ? client.getCreditModifier() : 0.0;
        double requestedAmount = request.getRequestedAmount();
        int loanTerm = request.getDurationInMonths();
        double creditScore = creditModifier / requestedAmount * loanTerm;
        double maximumAllowed;

        // Banking configurations
        double creditScoreThreshold = bankingConfiguration.getCreditScoreThreshold();
        double maximumLoanAmount = bankingConfiguration.getMaximumLoanAmount();
        double minimumLoanAmount = bankingConfiguration.getMinimumLoanAmount();
        int maximumLoanTerm = bankingConfiguration.getMaximumLoanTerm();

        if ( creditScore >= creditScoreThreshold ) {

            log.info("Client {} credit score: {}, credit score threshold: {}, credit score is good, approving loan request",
                    client.getPersonalCode(), creditScore, creditScoreThreshold);
            maximumAllowed = Math.min(requestedAmount * creditScore, maximumLoanAmount);

        } else {

            log.info("Client {} credit score: {}, credit score is less than 1, adjusting requested amount",
                    client.getPersonalCode(), creditScore);

            // Decrease requested amount iteratively until credit score >= 1
            // or requested amount <= minimum allowed amount
            while (creditScore < creditScoreThreshold && requestedAmount > minimumLoanAmount) {
                requestedAmount -= 0.01; // Adjust as needed
                creditScore = creditModifier / requestedAmount * loanTerm;
            }

            maximumAllowed = this.formatAmount(requestedAmount);

            log.info("Client {} credit score: {}, requested amount adjusted to: {}",
                    client.getPersonalCode(), creditScore, maximumAllowed);

            // Adjust loan term until maximum allowed amount >= minimum loan amount
            // or credit score >= credit score threshold
            // up until maximum loan term is reached
            while ((maximumAllowed < minimumLoanAmount || creditScore < creditScoreThreshold) && loanTerm < maximumLoanTerm) {
                loanTerm++;
                creditScore = creditModifier / requestedAmount * loanTerm;
                maximumAllowed = creditScore * requestedAmount;
            }

            // If still not suitable after adjusting loan term
            if (maximumAllowed < minimumLoanAmount || creditScore < creditScoreThreshold) {
                log.info("Client {} credit score: {}, unable to find suitable loan term",
                        client.getPersonalCode(), creditScore);
                response.rejectRequest();
                return response;
            }
        }

        double formattedMaximumAllowed = this.formatAmount(maximumAllowed);

        response.setAllowedAmount(Math.min(formattedMaximumAllowed, maximumLoanAmount));
        response.setStatus(DecisionEngineStatus.APPROVED);
        response.setAllowedLoanTerm(loanTerm);
        return response;
    }

    private double formatAmount(double amount) {
        BigDecimal amountToFormat = new BigDecimal(amount);
        amountToFormat = amountToFormat.setScale(2, RoundingMode.HALF_EVEN);
        return amountToFormat.doubleValue();
    }
}
