package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;

import java.util.List;

public interface ClientService {

  public ClientResponse registerClient(ClientRequest clientDto);

  public ClientResponse get(int id);

  public List<ClientResponse> get();

  public ClientResponse update(int id, UpdateClientRequest clientDto);

  public ClientResponse delete(int id);

  public boolean isClientPresent(ClientRequest clientDTO);

  public Client getClientById(int id);

}
