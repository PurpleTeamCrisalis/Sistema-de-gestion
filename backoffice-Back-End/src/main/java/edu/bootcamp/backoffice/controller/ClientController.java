package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/client")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) { this.clientService = clientService; }

    @PostMapping(
            path = "/",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ClientResponse> registerClient(
            @RequestBody ClientRequest createRequest
    ){
        ClientResponse clientDto = clientService.registerClient(createRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(clientDto.getId())
                .toUri();
        return ResponseEntity.created(location).body(clientDto);
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ClientResponse> getClient(@PathVariable int id)
    {
        ClientResponse client = clientService.get(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping(
            path = "/list",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<ClientResponse>> getAllClients()
    {
        List<ClientResponse> clients = clientService.get();
        return ResponseEntity.ok(clients);
    }

    @PatchMapping(
            path = "update/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ClientResponse> updateClient(
            @PathVariable int id,
            @RequestBody UpdateClientRequest clientDTO)
    {
        ClientResponse client = clientService.update(id, clientDTO);
        return ResponseEntity.ok(client);
    }

    @DeleteMapping(
            value = "delete/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ClientResponse> deleteClient(@PathVariable int id)
    {
        ClientResponse client = clientService.delete(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping(value = "list/{clientId}/subscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SubscriptionResponse>> getClientSubscriptions(@PathVariable int clientId) {
        //List<SubscriptionResponse> subscription = clientService.getClientSubscriptions(clientId);
        // return ResponseEntity.ok(subscription);
        return null;
    }
}
