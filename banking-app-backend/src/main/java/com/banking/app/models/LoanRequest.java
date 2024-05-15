package com.banking.app.models;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequest {

    @NotBlank(message = "Personal code is required")
    @NotNull(message = "Personal code is required")
    private String personalCode;

    @NotNull(message = "Loan amount is required")
    @Min(value = 2000, message = "Loan amount must be at least 2000")
    @Max(value = 10000, message = "Maximum loan amount is 10000")
    private Double requestedAmount;

    @NotNull(message = "Duration in months is required")
    @Min(value = 12, message = "Minimum duration is 12 months")
    @Max(value = 60, message = "Maximum duration is 60 months")
    private Integer durationInMonths;

}
