package com.banking.app.controllers;

import com.banking.app.models.LoanResponse;
import com.banking.app.models.LoanRequest;
import com.banking.app.services.DecisionEngineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/v1/banking"})
public class BankingController {

    private final DecisionEngineService decisionEngineService;

    @PostMapping("/request-loan")
    public LoanResponse requestLoan(
            @Valid @RequestBody LoanRequest request
    ) {
        return decisionEngineService.processLoanRequest(request);
    }
}
