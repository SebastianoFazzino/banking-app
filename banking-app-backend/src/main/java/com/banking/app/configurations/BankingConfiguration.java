package com.banking.app.configurations;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.banking")
public class BankingConfiguration {

    private Integer maximumLoanTerm;

    private Double maximumLoanAmount;

    private Double minimumLoanAmount;

    private Double creditScoreThreshold;

}
