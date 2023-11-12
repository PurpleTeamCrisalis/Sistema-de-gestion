package edu.bootcamp.backoffice.model.client;

import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.SubscriptionFactory;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
        List<SubscriptionResponse> subscriptionResponses = createSubscriptionsResponses((List<Subscription>) client.getClientSubscriptions());
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
                .subscriptions(subscriptionResponses)
                .build();
    }

    public List<SubscriptionResponse> createSubscriptionsResponses(List<Subscription> subscription) {
        List<SubscriptionResponse> subscriptionResponses = new ArrayList<SubscriptionResponse>();
        for (Subscription s : subscription) {
            SubscriptionResponse subscriptionResponse = SubscriptionFactory.createResponse(s);
            subscriptionResponses.add(subscriptionResponse);
        }
        return subscriptionResponses;
    }
}
