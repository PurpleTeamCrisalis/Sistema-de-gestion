package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.EmptyElementException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.SubscriptionFactory;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.repository.ClientRepository;
import edu.bootcamp.backoffice.repository.SubscriptionRepository;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final ClientFactory dtoFactory;
    private final SubscriptionRepository subscriptionRepository;
    private final Validator validator;

    private final SubscriptionFactory subscriptionFactory;


    public ClientServiceImpl(
            ClientRepository clientRepository,
            ClientFactory dtoFactory,
            SubscriptionRepository subscriptionRepository, Validator validator,
            SubscriptionFactory subscriptionFactory) {
        this.clientRepository = clientRepository;
        this.dtoFactory = dtoFactory;
        this.subscriptionRepository = subscriptionRepository;
        this.validator = validator;
        this.subscriptionFactory = subscriptionFactory;
    }


    public ClientResponse registerClient(ClientRequest clientRequest) {
        validateNewClientRequest(clientRequest);
        validateNewClientDbConflicts(clientRequest);
        Client client = dtoFactory.CreateEntityForInsertNewRecord(clientRequest);
        client = clientRepository.save(client);
        return dtoFactory.createResponse(client);
    }

    private void validateNewClientRequest(ClientRequest clientRequest) {
        StringBuilder errors = new StringBuilder();
        validateClient(clientRequest, errors);
        validateErrors(errors);
    }

    private void validateNewClientDbConflicts(
            ClientRequest clientRequest
    ) {
        Optional<Client> result;
        if (clientRequest.getIsbussiness()) {
            result = clientRepository.findByCuit(
                    clientRequest.getCuit()
            );
        } else {
            result = clientRepository.findByDni(
                    clientRequest.getDni()
            );
        }
        if (result.isPresent())
            throw new AlreadyRegisteredException(
                    "Dni/Cuit not available."
            );
    }

    public ClientResponse update(Integer id, UpdateClientRequest clientRequest) {
        validateUpdateRequest(id, clientRequest);
        Client client = validateUpdateConflicts(id, clientRequest);
        client = clientRepository.save(client);
        return dtoFactory.createResponse(client);
    }

    private void validateUpdateRequest(
            int id,
            UpdateClientRequest clientRequest
    ) {
        StringBuilder errors = new StringBuilder();
        validator.validateIdFormat(id, errors);
        validateClient(clientRequest, errors);
        validateErrors(errors);
    }

    private Client validateUpdateConflicts(Integer id, UpdateClientRequest clientDto) {
        Client client = validator.completeValidationForId(
                id,
                clientRepository
        );
        if (clientDto.getSubscriptionId() != null) {
            // Buscar la subscripcion por id y setear false al enabled
            for (Subscription subs : client.getClientSubscriptions()) {
                if (subs.getId().equals(clientDto.getSubscriptionId())) {
                    subs.setEnabled(false);
                    break;
                }
            }
        }
        if (clientDto.getName() != null)
            client.setName(clientDto.getName());
        if (clientDto.getLastname() != null)
            client.setLastName(clientDto.getLastname());
        if (clientDto.getDni() != null)
            client.setDni(clientDto.getDni());
        if (clientDto.getPhone() != null)
            client.setPhone(clientDto.getPhone());
        if (clientDto.getAdress() != null)
            client.setAdress(clientDto.getAdress());
        if (clientDto.getStartdate() != null)
            client.setStartDate(clientDto.getStartdate());
        if (clientDto.getIsbussiness() != null) {
            if (clientDto.getIsbussiness()) {
                if (client.getIsBussiness()) {
                    if (clientDto.getBussinessname() != null)
                        client.setBussinessName(clientDto.getBussinessname());
                    if (clientDto.getCuit() != null)
                        client.setCuit(clientDto.getCuit());
                } else {
                    StringBuilder errorBuilder = new StringBuilder(
                            "Intentando actualizar el usuario Persona a usuario Empresa: "
                    );
                    int count = errorBuilder.length();
                    if (clientDto.getBussinessname() == null)
                        errorBuilder.append("No se provee el nombre de la empresa.");
                    if (clientDto.getCuit() == null)
                        errorBuilder.append("No se provee el cuit de la empresa.");
                    if (errorBuilder.length() > count)
                        throw new EmptyElementException(errorBuilder.toString());
                    client.setBussinessName(clientDto.getBussinessname());
                    client.setCuit(clientDto.getCuit());
                    client.setIsBussiness(true);
                }
            } else {
                client.setBussinessName(null);
                client.setCuit(null);
                client.setIsBussiness(false);
            }
        }
        if (clientDto.getEnabled() != null)
            client.setEnabled(clientDto.getEnabled());
        return client;
    }

    public ClientResponse get(Integer id) {
        Client client = validator.completeValidationForId(
                id,
                clientRepository
        );
        return dtoFactory.createResponse(client);
    }

    public Client getClientEntity(
            Integer id,
            StringBuilder errorBuilder
    ) {
        return validator.validateFkExistence(
                id,
                clientRepository,
                errorBuilder
        );
    }

    public List<ClientResponse> get() {
        List<Client> clients = clientRepository.findAll();
        List<ClientResponse> dtos = new ArrayList<>();
        for (Client client : clients)
            dtos.add(dtoFactory.createResponse(client));
        return dtos;
    }

    public ClientResponse delete(Integer id) {
        Client client = validator.validateSoftDeletableEntityExistence(
                id,
                clientRepository
        );
        List<Order> orders = client.getClientOrders();
        if (orders.size() > 0) {
            client.setEnabled(false);
            clientRepository.save(client);
        } else
            clientRepository.delete(client);
        return dtoFactory.createResponse(client);
    }

    private void validateErrors(StringBuilder errors) {
        if (errors.length() != 0)
            throw new InvalidArgumentsFormatException(
                    errors.toString()
            );
    }

    private void validateClient(
            ClientRequest clientRequest,
            StringBuilder errorBuilder
    ) {
        validator.validateVarchar(
                clientRequest.getName(),
                EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                errorBuilder,
                "Client name"
        );
        validator.validateVarchar(
                clientRequest.getLastname(),
                EntitiesConstraints.CLIENTLASTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTLASTNAME_MAX_LENGTH,
                errorBuilder,
                "Client lastname"
        );
        validator.validateIntegerValue
                (clientRequest.getDni(),
                        EntitiesConstraints.CLIENTDNI_MAX,
                        EntitiesConstraints.CLIENTDNI_MIN,
                        "Client dni",
                        errorBuilder
                );
        validator.validateLongValue(
                clientRequest.getPhone(),
                EntitiesConstraints.CLIENTPHONE_MAX,
                EntitiesConstraints.CLIENTPHONE_MIN,
                "Client phone",
                errorBuilder
        );
        validator.validateVarchar(
                clientRequest.getAdress(),
                EntitiesConstraints.CLIENTADDRESS_MIN_LENGTH,
                EntitiesConstraints.CLIENTADDRESS_MAX_LENGTH,
                errorBuilder,
                "Client adress"
        );
        var isBussinesNotNull = !validator.isNull(
                clientRequest.getIsbussiness(),
                errorBuilder,
                "isbussiness"
        );
        if (isBussinesNotNull && clientRequest.getIsbussiness()) {
            validator.validateVarchar(
                    clientRequest.getBussinessname(),
                    EntitiesConstraints.CLIENT_BUSSINESSNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENT_BUSSINESSNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client bussinessname"
            );
            validator.isNull(
                    clientRequest.getStartdate(),
                    errorBuilder,
                    "startsate"
            );
            validator.validateLongValue(
                    clientRequest.getCuit(),
                    EntitiesConstraints.CLIENTCUIT_MAX,
                    EntitiesConstraints.CLIENTCUIT_MIN,
                    "Client cuit",
                    errorBuilder
            );
        }
    }

    private void validateClient(
            UpdateClientRequest clientRequest,
            StringBuilder errorBuilder
    ) {
        validator.validateVarchar(
                clientRequest.getName(),
                EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                errorBuilder,
                "Client name"
        );
        validator.validateVarchar(
                clientRequest.getLastname(),
                EntitiesConstraints.CLIENTLASTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTLASTNAME_MAX_LENGTH,
                errorBuilder,
                "Client lastname"
        );
        validator.validateLongValue(
                (long) clientRequest.getDni(),
                (long) EntitiesConstraints.CLIENTDNI_MAX,
                (long) EntitiesConstraints.CLIENTDNI_MIN,
                "Client dni",
                errorBuilder
        );
        validator.validateLongValue(
                clientRequest.getPhone(),
                EntitiesConstraints.CLIENTPHONE_MAX,
                EntitiesConstraints.CLIENTPHONE_MIN,
                "Client phone",
                errorBuilder
        );
        validator.validateVarchar(
                clientRequest.getAdress(),
                EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                errorBuilder,
                "Client adress"
        );
        if (validator.isNull(
                clientRequest.getIsbussiness(),
                errorBuilder,
                "isbussiness"
        )) return;
        if (clientRequest.getIsbussiness()) {
            validator.validateVarchar(
                    clientRequest.getBussinessname(),
                    EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client bussinessname"
            );
            validator.isNull(
                    clientRequest.getStartdate(),
                    errorBuilder,
                    "startdate"
            );
            validator.validateLongValue(
                    clientRequest.getCuit(),
                    EntitiesConstraints.CLIENTCUIT_MAX,
                    EntitiesConstraints.CLIENTCUIT_MIN,
                    "Client cuit",
                    errorBuilder
            );
        }
        // validator.isEmpty(
        //         clientRequest.getEnabled(),
        //         errorBuilder
        // );
        validator.isNull(
                clientRequest.getEnabled(),
                errorBuilder,
                "enabled"
        );
    }

    @Override
    public void createSubscriptionsAndMergeWithClient(
            Client client,
            List<ServiceDetail> serviceDetails
        )
    {
        if (client == null || serviceDetails == null)
            throw new IllegalArgumentException("Client and services must not be null");
        StringBuilder errorBuilder = new StringBuilder();
        for (ServiceDetail detail : serviceDetails)
        {
            ServiceEntity service = detail.getService();
            if (!clientHaveActiveSubscription(client, service, errorBuilder)) {
                Subscription subscription = new Subscription();
                subscription.setClient(client);
                subscription.setEnabled(true);
                subscription.setService(service);
                service.getServiceSubscriptions().add(subscription);
                client.getClientSubscriptions().add(subscription);
            }
        }
        if(errorBuilder.length()>0)
            throw new IllegalArgumentException(errorBuilder.toString());
    }

/*
    @Override
    public void registerSubscriptions(Client client, List<ServiceDetail> serviceDetails) {
        //Verifica que los parámetros no sean nulos
        if (client == null || serviceDetails == null) {
            throw new IllegalArgumentException("Client and services must not be null");
        }
        StringBuilder errorBuilder = new StringBuilder();

        // Obtencion del service de cada detail
        List<ServiceEntity> services = new ArrayList<>();
        for (ServiceDetail detail : serviceDetails) {
            services.add(detail.getService());
        }

        //Guardado de suscripcion con sus validaciones
        for (ServiceEntity service : services) {
            if (!clientHaveActiveSubscription(client, service, errorBuilder)) {
                Subscription subscription = new Subscription();
                subscription.setClient(client);
                subscription.setEnabled(true);
                subscription.setService(service);

                subscriptionRepository.save(subscription);
            } else {
                throw new IllegalArgumentException(errorBuilder.toString());
            }
        }
    }
*/
    public Boolean clientHaveActiveSubscription(Client client, ServiceEntity service, StringBuilder errorBuilder) {
        if (client == null || service == null) {
            throw new IllegalArgumentException("Client and service must not be null");
        }

        StringBuilder niceError = new StringBuilder(
                client.getName() +
                        " already has a suscription for " +
                        service.getName()
        );
        for (Subscription sub : client.getClientSubscriptions()) {
            ServiceEntity subService = sub.getService();
            if (subService != null && subService.getId() != null && subService.getId().equals(service.getId())) {
                if (sub.isEnabled()) {
                    errorBuilder.append(niceError);
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public ServiceEntity getDiscountService(Client client) {
        // Buscar las subscripciones que posee el cliente y mandar una subscripcion que este activa
        for (Subscription subscriptions : client.getClientSubscriptions()) {
            if (subscriptions.isEnabled()) {
                return subscriptions.getService();
            } else {
                continue;
            }
        }
        return null;
    }

    @Override
    public List<SubscriptionResponse> getClientSubscriptions(Integer clientId) {

        Client client = validator.validateSoftDeletableEntityExistence(clientId, clientRepository);

        List<SubscriptionResponse> subscriptionsResponses = new ArrayList<>();

        for (Subscription subscriptions : client.getClientSubscriptions()) {
            subscriptionsResponses.add(subscriptionFactory.createResponse(subscriptions));
        }

        return subscriptionsResponses;
    }

}
