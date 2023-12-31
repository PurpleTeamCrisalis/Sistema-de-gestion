package edu.bootcamp.backoffice.model.Subscription;

import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionRequest;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionFactory {

    public Subscription CreateEntityForInsertNewRecord(SubscriptionRequest subscriptionRequest) {
        return Subscription
                .builder()
                .enabled(true)
                .build();
    }

    public SubscriptionResponse createResponse(Subscription subscription) {
        return SubscriptionResponse
                .builder()
                .id(subscription.getId())
                .serviceName(subscription.getService().getName())
                .enabled(subscription.isEnabled())
                .build();
    }

}
