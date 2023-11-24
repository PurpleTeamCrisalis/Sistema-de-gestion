package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.service.ServiceEntity;

import java.util.List;

public interface ClientService {

    public ClientResponse registerClient(ClientRequest clientDto);

    public ClientResponse get(Integer id);

    public Client getClientEntity(
            Integer id,
            StringBuilder errorBuilder
    );

    public List<ClientResponse> get()
            throws InvalidIdFormatException;

    public ClientResponse update(Integer id, UpdateClientRequest clientDto)
            throws InvalidIdFormatException;

    public ClientResponse delete(Integer id)
            throws InvalidIdFormatException;

    public void createSubscriptionsAndMergeWithClient(Client client, List<ServiceDetail> services);

    public ServiceEntity getDiscountService(Client client);

    public List<SubscriptionResponse> getClientSubscriptions(Integer clientId);



}
