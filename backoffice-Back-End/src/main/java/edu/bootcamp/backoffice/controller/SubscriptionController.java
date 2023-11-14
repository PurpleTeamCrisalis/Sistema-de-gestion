package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.ServiceService;
import edu.bootcamp.backoffice.service.Interface.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    private final ClientService clientService;
    private final ServiceService serviceService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, ClientService clientService, ServiceService serviceService) {
        this.subscriptionService = subscriptionService;
        this.clientService = clientService;
        this.serviceService = serviceService;
    }

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SubscriptionResponse>> getAllSubscription() {
        List<SubscriptionResponse> subscriptions = subscriptionService.get();
        return ResponseEntity.ok(subscriptions);
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SubscriptionResponse> deleteSubscription(@PathVariable int id) {
        SubscriptionResponse subscription = subscriptionService.delete(id);
        return ResponseEntity.ok(subscription);
    }

    /*@PostMapping(
            path = "/",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SubscriptionResponse> registerSubscription(
            @RequestBody ClientRequest clientRequest, @RequestBody List<ServiceRequest> services
    ) {

        ClientResponse clientDto = clientService.registerClient(clientRequest);
        ServiceResponse serviceDto = serviceService.registerService(services.get(0));

        clientService.registerClient();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(clientDto.getId())
                .toUri();

        return ResponseEntity.created(location).body(clientDto);
    }*/
}
