package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.EmptyElementException;
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

    private Client validateUpdateConflicts(int id, UpdateClientRequest clientDto)
    {
        Client client = validator.completeValidationForId(
                id,
                clientRepository
        );
        if(clientDto.getName()!=null)
            client.setName(clientDto.getName());
        if(clientDto.getLastname()!=null)
            client.setLastName(clientDto.getLastname());
        if(clientDto.getDni()!=null)
            client.setDni(clientDto.getDni());
        if(clientDto.getPhone()!=null)
            client.setPhone(clientDto.getPhone());
        if(clientDto.getAdress()!=null)
            client.setAdress(clientDto.getAdress());
        if (clientDto.getStartdate() != null)
            client.setStartDate(clientDto.getStartdate());
        if(clientDto.getIsbussiness()!=null)
        {
            if(clientDto.getIsbussiness()) {
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
            }
            else
            {
                client.setBussinessName(null);
                client.setCuit(null);
                client.setIsBussiness(false);
            }
        }
        if(clientDto.getEnabled()!=null)
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

    public Client getClientEntity(int id) {
        return validator.completeValidationForId(id, clientRepository);
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
                EntitiesConstraints.CLIENTADDRESS_MIN_LENGTH,
                EntitiesConstraints.CLIENTADDRESS_MAX_LENGTH,
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
                    EntitiesConstraints.CLIENT_BUSSINESSNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENT_BUSSINESSNAME_MAX_LENGTH,
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
        if(clientRequest.getName()!=null)
            validator.validateVarchar(
                    clientRequest.getName(),
                    EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client name"
            );
        if(clientRequest.getLastname()!=null)
            validator.validateVarchar(
                    clientRequest.getLastname(),
                    EntitiesConstraints.CLIENTLASTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTLASTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client lastname"
            );
        if(clientRequest.getDni()!=null)
            validator.validateLongValue(
                    (long)clientRequest.getDni(),
                    (long)EntitiesConstraints.CLIENTDNI_MAX,
                    (long)EntitiesConstraints.CLIENTDNI_MIN,
                    "Client dni",
                    errorBuilder
            );
        if(clientRequest.getPhone()!=null)
            validator.validateLongValue(
                    clientRequest.getPhone(),
                    EntitiesConstraints.CLIENTPHONE_MAX,
                    EntitiesConstraints.CLIENTPHONE_MIN,
                    "Client phone",
                    errorBuilder
            );
        if(clientRequest.getAdress()!=null)
            validator.validateVarchar(
                    clientRequest.getAdress(),
                    EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                    EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                    errorBuilder,
                    "Client adress"
            );
       if(clientRequest.getIsbussiness() != null && clientRequest.getIsbussiness()){
           if(clientRequest.getBussinessname()!=null)
               validator.validateVarchar(
                        clientRequest.getBussinessname(),
                        EntitiesConstraints.CLIENTNAME_MIN_LENGTH,
                        EntitiesConstraints.CLIENTNAME_MAX_LENGTH,
                        errorBuilder,
                        "Client bussiness name"
                );
           if(clientRequest.getCuit()!=null)
                validator.validateLongValue(
                        clientRequest.getCuit(),
                        EntitiesConstraints.CLIENTCUIT_MAX,
                        EntitiesConstraints.CLIENTCUIT_MIN,
                        "Client cuit",
                        errorBuilder
                );
        }
    }
}
