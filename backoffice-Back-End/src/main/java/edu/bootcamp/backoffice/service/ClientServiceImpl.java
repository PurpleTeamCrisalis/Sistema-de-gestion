package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientRequest;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.repository.ClientRepository;
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
    private final Validator validator;

    public ClientServiceImpl(
            ClientRepository clientRepository,
            ClientFactory dtoFactory,
            Validator validator
    ) {
        this.clientRepository = clientRepository;
        this.dtoFactory = dtoFactory;
        this.validator = validator;
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

    public ClientResponse update(int id, UpdateClientRequest clientRequest) {
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

    private Client validateUpdateConflicts(
            int id,
            UpdateClientRequest clientDto
    ) {
        Optional<Client> result = clientRepository
                .findById(id);
        Client client;
        boolean modified = checkIfModified(result.get(), clientDto);
        if (!modified)
            throw new AlreadyUpdatedException(
                    "Not modified database."
            );
        client = findAndSetAtributesIfNotNull(id, clientDto);
        return client;
    }

    private Boolean checkIfModified(Client client, UpdateClientRequest clientDto) {
        if (
                !client.getName().equals(clientDto.getName()) ||
                        !client.getLastName().equals(clientDto.getLastname()) ||
                        !client.getDni().equals(clientDto.getDni()) ||
                        !client.getPhone().equals(clientDto.getPhone()) ||
                        !client.getAdress().equals(clientDto.getAdress()) ||
                        !client.getBussinessName().equals(clientDto.getBussinessname()) ||
                        !client.getStartDate().equals(clientDto.getStartdate()) ||
                        !client.getCuit().equals(clientDto.getCuit()) ||
                                !((Boolean)client.isEnabled()).equals(clientDto.getEnabled())
        ) return true;
        return false;
    }

    private Client findAndSetAtributesIfNotNull(int id, UpdateClientRequest clientDto) {
        Client client = validator.completeValidationForId(
                id,
                clientRepository
        );

        client.setName(clientDto.getName());
        client.setLastName(clientDto.getLastname());
        client.setDni(clientDto.getDni());
        client.setPhone(clientDto.getPhone());
        client.setAdress(clientDto.getAdress());
        if(client.getIsBussiness()) {
            client.setBussinessName(clientDto.getBussinessname());
            client.setStartDate(clientDto.getStartdate());
            client.setCuit(clientDto.getCuit());
        }
        client.setEnabled(clientDto.getEnabled());
        return client;
    }

    public ClientResponse get(int id) {
        Client client = validator.completeValidationForId(
                id,
                clientRepository
        );
        return dtoFactory.createResponse(client);
    }

    public List<ClientResponse> get() {
        List<Client> clients = clientRepository.findAll();
        List<ClientResponse> dtos = new ArrayList<>();
        for (Client client : clients)
            dtos.add(dtoFactory.createResponse(client));
        if (dtos.isEmpty())
            throw new EmptyTableException(
                    "There aren't registered clients."
            );
        return dtos;
    }

    public ClientResponse delete(int id) {
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
                EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                errorBuilder,
                "Client adress"
        );
        validator.isEmpty(
                clientRequest.getIsbussiness(),
                errorBuilder
        );
        if(clientRequest.getIsbussiness()){
            validator.validateVarchar(
                    clientRequest.getBussinessname(),
                    EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client bussiness name"
            );
            validator.isEmpty(
                    clientRequest.getStartdate(),
                    errorBuilder
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
                (long)clientRequest.getDni(),
                (long)EntitiesConstraints.CLIENTDNI_MAX,
                (long)EntitiesConstraints.CLIENTDNI_MIN,
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
       if(validator.isEmpty(
                clientRequest.getIsbussiness(),
                errorBuilder
        ))return;
       if(clientRequest.getIsbussiness()){
            validator.validateVarchar(
                    clientRequest.getBussinessname(),
                    EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client bussiness name"
            );
            validator.isEmpty(
                    clientRequest.getStartdate(),
                    errorBuilder
            );
            validator.validateLongValue(
                    clientRequest.getCuit(),
                    EntitiesConstraints.CLIENTCUIT_MAX,
                    EntitiesConstraints.CLIENTCUIT_MIN,
                    "Client cuit",
                    errorBuilder
            );
       }
       validator.isEmpty(
               clientRequest.getEnabled(),
               errorBuilder
       );
    }
}