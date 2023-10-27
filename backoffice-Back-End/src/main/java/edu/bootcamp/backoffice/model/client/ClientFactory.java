package edu.bootcamp.backoffice.model.client;

import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import org.springframework.stereotype.Component;


@Component
public class ClientFactory {

  public Client CreateClientEntity() {
    return Client
        .builder()
        .enabled(true)
        .build();
  }

  public Client CreateEntityForInsertNewRecord(ClientRequest clientDTO) {
    return Client
        .builder()
        .enabled(true)
        .build();
  }

  public ClientResponse createResponse(Client client) {
    return ClientResponse
        .builder()
        .enabled(client.isEnabled())
        .id(client.getId())
        .build();
  }

}