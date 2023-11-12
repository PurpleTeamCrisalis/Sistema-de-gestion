package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.SubscriptionFactory;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.repository.SubscriptionRepository;
import edu.bootcamp.backoffice.service.Interface.SubscriptionService;

import java.util.List;

public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionFactory subscriptionFactory;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, SubscriptionFactory subscriptionFactory) {
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionFactory = subscriptionFactory;
    }

    @Override
    public Subscription getSubscription(Integer id) throws InvalidIdFormatException {
        return null;
    }

    @Override
    public List<SubscriptionResponse> get() {
        return null;
    }

    @Override
    public SubscriptionResponse delete(Integer id) throws InvalidIdFormatException {
        return null;
    }
}