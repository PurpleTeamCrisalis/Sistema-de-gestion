package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.repository.ClientRepository;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {
  private final ClientRepository clientRepository;
  private final Validator validator;

  public ClientServiceImpl(
    ClientRepository clientRepository,
    Validator validator
  ) {
    this.clientRepository = clientRepository;
    this.validator = validator;
  }

  public Client getClientById(int id) {
    return validator.completeValidationForId(
        id,
        clientRepository);
  }
}
