package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.repository.ClientRepository;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {
  private final ClientRepository clientRepository;
  private final ClientFactory clientFactory;
  private final Validator validator;

  public ClientServiceImpl(
    ClientRepository clientRepository,
    ClientFactory clientFactory,
    Validator validator
  ) {
    this.clientRepository = clientRepository;
    this.clientFactory = clientFactory;
    this.validator = validator;
  }

  public ClientResponse getClientResponse(int id) {
    Client client = validator.completeValidationForId(id, clientRepository);
    return clientFactory.createResponse(client);
  }
  public Client getClient(int id) {
    return validator.completeValidationForId(id, clientRepository);
  }
}
