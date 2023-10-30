package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;
import java.util.Optional;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyUpdatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.Charge.Charge;
import edu.bootcamp.backoffice.model.Charge.ChargeFactory;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Charge.dto.UpdateChargeRequest;
import edu.bootcamp.backoffice.model.order.ChargeConstraints;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.repository.ChargeRepository;
import edu.bootcamp.backoffice.service.Interface.ChargeService;

import java.util.ArrayList;
import java.util.List;

@Service //Implementamos la interfaz de ChargeService
public class ChargeServiceImpl implements ChargeService{
    private final ChargeFactory dtoFactory;
    private final ChargeRepository chargeRepository;
    private final Validator validator;

    public ChargeServiceImpl(
        ChargeRepository chargeRepository,
        ChargeFactory dtoFactory,
        Validator validator
    ){

        this.dtoFactory = dtoFactory;
        this.chargeRepository = chargeRepository;
        this.validator = validator;
    }
    //Creamos la logica de las funciones creada en la interfaz
    /** Creando nuevo Cargo **/
    public ChargeResponse createCharge(ChargeRequest chargeRequest){
        validateNewChargeRequest(chargeRequest); //Validamos entradas
        validateNewChargeDbConflicts(chargeRequest); //Validamos que los registros no se repitan
        Charge charge = dtoFactory.CreateEntityForInsertNewRecord(chargeRequest); //Creamos la Entity
        charge = chargeRepository.save(charge); //Guardamos el registro
        return dtoFactory.createResponse(charge); //Devolvemos la info del registro
    }

    /** Verificamos que no se repitan de nuevo los nombre del impuesto */
    public void validateNewChargeDbConflicts(ChargeRequest chargeRequest){
        Optional<Charge> result = chargeRepository.findByChargeName(chargeRequest.getChargeName());
        if(result.isPresent()) throw new AlreadyRegisteredException("Charge not available.");
    }

    /** Validamos entradas del Request */
    public void validateNewChargeRequest(ChargeRequest chargeRequest){
        StringBuilder errors = new StringBuilder();
        validateChargename(chargeRequest.getChargeName(), errors);
        validatePercentage(chargeRequest.getChargePercentage(), errors);
        validateErrors(errors);

    }

    public void validateErrors(StringBuilder errors){
        if(errors.length() != 0){
            throw new InvalidArgumentsFormatException(errors.toString());
        }
    }

    //Validaciones de chargename
    private void validateChargename(String chargename, StringBuilder errorBuilder){
        validator.validateVarchar(
            chargename, 
            ChargeConstraints.CHARGENAME_MIN_LENGTH, 
            ChargeConstraints.CHARGENAME_MAX_LENGTH,
            errorBuilder, 
            chargename
        );
    }
    
    //Validacion de percentage
    public void validatePercentage(int percentage, StringBuilder errorBuilder){
        validator.validateInterge(
            percentage, 
            ChargeConstraints.CHARGEPERCENTAGE_MIN_LENGTH, 
            ChargeConstraints.CHARGEPERCENTAGE_MAX_LENGTH,
            errorBuilder, 
            "Percentage");;
    }

    /** Eliminando un impuesto **/
    public ChargeResponse delete(int id){
        Charge charge = validator.validateSoftDeletableEntityExistence(id, chargeRepository);
        chargeRepository.delete(charge);
        return dtoFactory.createResponse(charge);
    }

    /** Obteniendo TODOS un registro */
    public List<ChargeResponse> get(){
        List<Charge> charges = chargeRepository.findAll();
        List<ChargeResponse> dtos = new ArrayList<>();

        for(Charge charge : charges) dtos.add(dtoFactory.createResponse(charge));
        if(dtos.isEmpty()) 
            throw new EmptyTableException("There aren't registered users.");

        return dtos;
    }

    /** Obteniendo un registro */
    public ChargeResponse get(int id){
        Charge charge  = validator.completeValidationForId(id, chargeRepository);
        return dtoFactory.createResponse(charge);
    }

    /** Modificando un registro  */
    public ChargeResponse update(int id, UpdateChargeRequest chargeRequest){
        validateUpdateRequest(id, chargeRequest);
        Charge charge = validateUpdateConflicts(id, chargeRequest);
        charge = chargeRepository.save(charge);
        return dtoFactory.createResponse(charge);
    }

    private void validateUpdateRequest(int id, UpdateChargeRequest chargeRequest){
        StringBuilder errors = new StringBuilder();
        validator.validateIdFormat(id, errors);
        if(chargeRequest.getName() != null) 
            validateChargename(chargeRequest.getName(), errors);
        if(chargeRequest.getChargePercentage() != null) 
            validatePercentage(chargeRequest.getChargePercentage(), errors);
        validateErrors(errors);
    }

    private Charge validateUpdateConflicts(int id, UpdateChargeRequest chargeDto){
        Optional<Charge> result = chargeRepository.findByChargeName(chargeDto.getName());
        Charge charge;
        boolean modified = !result.isPresent();
        if(modified) 
            charge = findAndSetChargenameIfNotNull(id, chargeDto.getName());
        else
            charge = validateEnabledUserSearchResult(result, id);
        
        modified |= mergeEnabled(chargeDto, charge);
        modified |= mergePercentage(chargeDto, charge);

        if(!modified)
            throw new AlreadyUpdatedException("Not modified database.");
        
        return charge;
    }

     private Charge findAndSetChargenameIfNotNull(int id, String chargename)
    {
        Charge charge = validator.completeValidationForId(id, chargeRepository);
        if(charge != null)
            charge.setChargeName(chargename);
        return charge;
    }

    private boolean mergeEnabled(UpdateChargeRequest chargeDto, Charge charge)
    {
        Boolean dtoEnabled = chargeDto.getEnabled();
        Boolean chargeEnabled = charge.isEnabled();
        if(dtoEnabled != null && !chargeEnabled.equals(dtoEnabled))
        {
            charge.setEnabled(chargeDto.getEnabled());
            return true;
        }
        return false;
    }
    
    private boolean mergePercentage(UpdateChargeRequest chargeDto, Charge charge)
    {
        Integer dtoPercentage = chargeDto.getChargePercentage();
        Integer chargePercentage = charge.getChargePercentage();
        if(dtoPercentage != null && !chargePercentage.equals(dtoPercentage))
        {
            charge.setChargePercentage(chargeDto.getChargePercentage());
            return true;
        }
        return false;
    }

    private Charge validateEnabledUserSearchResult(Optional<Charge> result, int requesteId){
        Charge charge = result.get();
        if(charge.getId() != requesteId)
            throw new AlreadyRegisteredException("Chargename not available");
        return charge;
    }
}
