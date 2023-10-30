package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;

public interface ClientService {

  public ClientResponse getClientResponse(int id);
  public Client getClient (int id);

}
