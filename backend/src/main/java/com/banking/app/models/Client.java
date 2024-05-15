package com.banking.app.models;

import com.banking.app.models.enums.ClientSegmentation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clients")
public class Client {

    @Id
    private String personalCode;

    @Enumerated(EnumType.STRING)
    private ClientSegmentation segmentation;

    private Double creditModifier;

}
