package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;

import java.util.List;

public interface SubscriptionService {

    public Subscription getSubscription(Integer id) throws InvalidIdFormatException;

    public List<SubscriptionResponse> get();

    public SubscriptionResponse delete(Integer id) throws InvalidIdFormatException;

}
