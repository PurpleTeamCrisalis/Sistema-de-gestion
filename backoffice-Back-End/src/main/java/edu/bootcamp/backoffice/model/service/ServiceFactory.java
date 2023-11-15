package edu.bootcamp.backoffice.model.service;

import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ServiceFactory {

    /*public ServiceFactory(SubscriptionFactory subscriptionFactory) {
        this.subscriptionFactory = subscriptionFactory;
    }*/

    public ServiceEntity CreateServiceEntity(String name, String description, double basePrice, boolean isSpecial,
                                             double suportCharge) {

        return ServiceEntity.builder().name(name).description(description).basePrice(basePrice).isSpecial(isSpecial)
                .suportCharge(suportCharge).enabled(true).build();
    }

    public ServiceEntity CreateEntityForInsertNewRecord(ServiceRequest servicetDto) {

        return ServiceEntity.builder().name(servicetDto.getName()).description(servicetDto.getDescription())
                .basePrice(servicetDto.getBasePrice())/*.isSpecial(servicetDto.isSpecial())
				.suportCharge(servicetDto.getSuportCharge())*/.enabled(true).serviceSubscriptions(new ArrayList<>()).build();

    }

    public ServiceResponse createResponse(ServiceEntity serviceEntity) {
        List<SubscriptionResponse> subscriptionResponses = createSubscriptionsResponses(serviceEntity.getServiceSubscriptions());
        return ServiceResponse.builder().id(serviceEntity.getId()).name(serviceEntity.getName()).description(serviceEntity.getDescription())
                .basePrice(serviceEntity.getBasePrice())/*.isSpecial(serviceEntity.isSpecial())
				.suportCharge(serviceEntity.getSuportCharge())*/
                .subscriptions(subscriptionResponses)
                .enabled(serviceEntity.isEnabled()).build();
    }

    public List<SubscriptionResponse> createSubscriptionsResponses(List<Subscription> subscription) {
        List<SubscriptionResponse> subscriptionResponses = new ArrayList<SubscriptionResponse>();
        SubscriptionResponse subsResponse = new SubscriptionResponse();
        if (subscription != null) {
            for (Subscription s : subscription) {

                subsResponse.setEnabled(s.isEnabled());
                subsResponse.setServiceName(s.getService().getName());
                subsResponse.setId(s.getId());

                subscriptionResponses.add(subsResponse);
            }
            return subscriptionResponses;
        }
        return subscriptionResponses;
    }
}
