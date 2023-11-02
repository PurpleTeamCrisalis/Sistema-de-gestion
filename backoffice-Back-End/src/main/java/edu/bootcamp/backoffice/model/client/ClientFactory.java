package edu.bootcamp.backoffice.model.client;

import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ClientFactory {

  public Client CreateEntityForInsertNewRecord(ClientRequest clientDTO) {
    return Client
        .builder()
        .name(clientDTO.getName())
        .lastName(clientDTO.getLastname())
        .dni(clientDTO.getDni())
        .phone(clientDTO.getPhone())
        .adress(clientDTO.getAdress())
        .isBussiness(clientDTO.getIsbussiness())
        .bussinessName(clientDTO.getBussinessname())
        .startDate(clientDTO.getStartdate())
        .cuit(clientDTO.getCuit())
        .enabled(true)
        .build();
  }

  public ClientResponse createResponse(Client client) {
    return ClientResponse
        .builder()
        .name(client.getName())
        .lastname(client.getLastName())
        .dni(client.getDni())
        .phone(client.getPhone())
        .adress(client.getAdress())
        .isbussiness(client.getIsBussiness())
        .bussinessname(client.getBussinessName())
        .startdate(client.getStartDate())
        .cuit(client.getCuit())
        .enabled(client.isEnabled())
        .id(client.getId())
        .build();
  }
}
