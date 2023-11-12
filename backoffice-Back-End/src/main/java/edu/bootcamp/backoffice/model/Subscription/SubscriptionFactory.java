package edu.bootcamp.backoffice.model.Subscription;

import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionRequest;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionFactory {

    private final ClientFactory clientFactory;

    private final ServiceFactory serviceFactory;

    public SubscriptionFactory(ClientFactory clientFactory, ServiceFactory serviceFactory) {
        this.clientFactory = clientFactory;
        this.serviceFactory = serviceFactory;
    }

    public Subscription CreateEntityForInsertNewRecord(SubscriptionRequest subscriptionRequest) {
        return Subscription
                .builder()
                .enabled(true)
                .build();
    }

    public static SubscriptionResponse createResponse(Subscription subscription) {
        return SubscriptionResponse
                .builder()
                .id(subscription.getId())
                .enabled(subscription.isEnabled())
                .build();
    }

    /*public SubscriptionResponse createSubscriptionResponse(Subscription subscription) {
        Set<ServiceResponse> servicesResponse = createServiceResponses();
        ClientResponse clientResponse = clientFactory.createResponse(subscription.getClient());
        return CreateResponse(subscription, servicesResponse, clientResponse);
    }

    private Set<ServiceResponse> createServiceResponses(Set<ServiceEntity> service) {
        Set<ServiceResponse> servicesResponses = new ArrayList<ServiceResponse>();
        for (ServiceEntity services : service) {
            ServiceResponse serviceResponse = serviceFactory.createResponse(services);
            servicesResponses.add(serviceResponse);
        }
        return servicesResponses;
    }

*/
}
