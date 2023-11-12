package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.service.Interface.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
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

}
