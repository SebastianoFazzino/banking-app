package com.banking.app.services;

import com.banking.app.exceptions.ClientNotFoundException;
import com.banking.app.models.Client;
import com.banking.app.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public Client getClientByPersonalCode(String personalCode) {

        return clientRepository.findByPersonalCode(personalCode)
                .orElseThrow(() -> new ClientNotFoundException(
                                "Client not found by personal code " + personalCode));
    }

}
