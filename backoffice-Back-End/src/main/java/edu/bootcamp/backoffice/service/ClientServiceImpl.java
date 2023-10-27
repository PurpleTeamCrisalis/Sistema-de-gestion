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
  private final ClientFactory dtoFactory;
  private final Validator validator;

  public ClientServiceImpl(
      ClientRepository clientRepository,
      ClientFactory dtoFactory,
      Validator validator) {
    this.clientRepository = clientRepository;
    this.dtoFactory = dtoFactory;
    this.validator = validator;
  }

  public boolean isClientPresent(ClientRequest clientDto) {
    StringBuilder errors = new StringBuilder();
    validateClientName(clientDto.getName(), errors);
    if (errors.length() > 0)
      throw new InvalidCredentialsException("Invalid client name");
    Optional<Client> result = clientRepository
        .findByDni(clientDto.getDni());
    if (result.isPresent())
      return !result.get().isDeleted();
    return false;
  }

  public ClientResponse registerClient(ClientRequest clientRequest) {
    validateNewClientRequest(clientRequest);
    validateNewClientDbConflicts(clientRequest);
    Client client = dtoFactory.CreateEntityForInsertNewRecord(clientRequest);
    client = clientRepository.save(client);
    return dtoFactory.createResponse(client);
  }

  private void validateNewClientRequest(ClientRequest clientRequest) {
    StringBuilder errors = new StringBuilder();
    validateClientName(clientRequest.getName(), errors);
    validateErrors(errors);
  }

  private void validateNewClientDbConflicts(
      ClientRequest clientRequest) {
    Optional<Client> result = clientRepository.findByDni(
        clientRequest.getDni());
    if (result.isPresent())
      throw new AlreadyRegisteredException(
          "Name not available.");
  }

  public ClientResponse update(int id, UpdateClientRequest clientRequest) {
    validateUpdateRequest(id, clientRequest);
    Client client = validateUpdateConflicts(id, clientRequest);
    client = clientRepository.save(client);
    return dtoFactory.createResponse(client);
  }

  private void validateUpdateRequest(
      int id,
      UpdateClientRequest clientRequest) {
    StringBuilder errors = new StringBuilder();
    validator.validateIdFormat(id, errors);
    if (clientRequest.getName() != null)
      validateClientName(clientRequest.getName(), errors);
    validateErrors(errors);
  }

  private Client validateUpdateConflicts(
      int id,
      UpdateClientRequest clientDto) {
    Optional<Client> result = clientRepository
        .findById(clientDto.getId());
    Client client;
    boolean modified = !result.isPresent();
    if (modified)
      client = findAndSetNameIfNotNull(id, clientDto.getName());
    else
      client = validateEnabledClientSearchResult(result, id);
    modified |= mergeEnabled(clientDto, client);
    if (!modified)
      throw new AlreadyUpdatedException(
          "Not modified database.");
    return client;
  }

  private Client validateEnabledClientSearchResult(
      Optional<Client> result,
      int requestId) {
    Client client = result.get();
    /*
     * Si se decide evitar dar alta logica :
     * if(user.isDeleted())
     * throw new DeletedAccountUpdateException("");
     */
    if (client.getId() != requestId)
      throw new AlreadyRegisteredException(
          "Name not available");
    return client;
  }

  private Client findAndSetNameIfNotNull(int id, String name) {
    Client client = validator.completeValidationForId(
        id,
        clientRepository);
    if (name != null)
      client.setName(name);
    return client;
  }

  private boolean mergeEnabled(UpdateClientRequest clientDto, Client client) {
    Boolean dtoEnabled = clientDto.getEnabled();
    Boolean clientEnabled = client.isEnabled();
    if (dtoEnabled != null && !clientEnabled.equals(dtoEnabled)) {
      client.setEnabled(clientDto.getEnabled());
      return true;
    }
    return false;
  }

  public ClientResponse get(int id) {
    Client client = validator.completeValidationForId(
        id,
        clientRepository);
    return dtoFactory.createResponse(client);
  }

  public List<ClientResponse> get() {
    List<Client> clients = clientRepository.findAll();
    List<ClientResponse> dtos = new ArrayList<>();
    for (Client client : clients)
      dtos.add(dtoFactory.createResponse(client));
    if (dtos.isEmpty())
      throw new EmptyTableException(
          "There aren't registered clients.");
    return dtos;
  }

  public ClientResponse delete(int id) {
    Client client = validator.validateSoftDeletableEntityExistence(
        id,
        clientRepository);
    List<Order> orders = client.getClientOrders();
    if (orders.size() > 0) {
      client.setEnabled(false);
      clientRepository.save(client);
    } else
      clientRepository.delete(client);
    return dtoFactory.createResponse(client);
  }

  private void validateErrors(StringBuilder errors) {
    if (errors.length() != 0)
      throw new InvalidArgumentsFormatException(
          errors.toString());
  }

  private void validateClientName(
      String name,
      StringBuilder errorBuilder) {
    validator.validateVarchar(
        name,
        EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
        EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
        errorBuilder,
        "Username");
  }

  public Client getClientById(int id) {
    Client client = clientRepository.findById(id).orElse(null);
    return client;
  }

}
