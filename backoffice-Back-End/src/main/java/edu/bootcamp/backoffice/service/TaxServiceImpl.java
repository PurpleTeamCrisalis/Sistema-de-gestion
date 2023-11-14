package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;
import java.util.Optional;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyUpdatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Tax.dto.UpdateChargeRequest;
import edu.bootcamp.backoffice.repository.TaxRepository;
import edu.bootcamp.backoffice.service.Interface.TaxService;

import java.util.ArrayList;
import java.util.List;
import edu.bootcamp.backoffice.service.Interface.ProductService;

@Service //Implementamos la interfaz de ChargeService
public class TaxServiceImpl implements TaxService{
    private final TaxFactory dtoFactory;
    private final TaxRepository taxRepository;
    private final Validator validator;

    public TaxServiceImpl(
        TaxRepository taxRepository,
        TaxFactory dtoFactory,
        Validator validator
    ){
        this.dtoFactory = dtoFactory;
        this.taxRepository = taxRepository;
        this.validator = validator;
    }
    //Creamos la logica de las funciones creada en la interfaz
    /** Creando nuevo Cargo **/
    public ChargeResponse createCharge(ChargeRequest chargeRequest){
        validateNewChargeRequest(chargeRequest); //Validamos entradas
        validateNewChargeDbConflicts(chargeRequest); //Validamos que los registros no se repitan
        Tax charge = dtoFactory.CreateEntityForInsertNewRecord(chargeRequest); //Creamos la Entity
        charge = taxRepository.save(charge); //Guardamos el registro
        return dtoFactory.createResponse(charge); //Devolvemos la info del registro
    }

    /** Verificamos que no se repitan de nuevo los nombre del impuesto */
    public void validateNewChargeDbConflicts(ChargeRequest chargeRequest){
        Optional<Tax> result = taxRepository.findByName(chargeRequest.getName());
        if(result.isPresent()) throw new AlreadyRegisteredException("Charge not available.");
    }

    /** Validamos entradas del Request */
    public void validateNewChargeRequest(ChargeRequest chargeRequest){
        StringBuilder errors = new StringBuilder();
        validateChargename(chargeRequest.getName(), errors);
        validatePercentage(chargeRequest.getPercentage(), errors);
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
            EntitiesConstraints.CHARGENAME_MIN_LENGTH, 
            EntitiesConstraints.CHARGENAME_MAX_LENGTH,
            errorBuilder, 
            "Charge"
        );
    }
    
    //Validacion de percentage
    public void validatePercentage(Integer percentage, StringBuilder errorBuilder){
        validator.validateIntegerValue(
            percentage,
            EntitiesConstraints.CHARGEPERCENTAGE_MAX_LENGTH,
            EntitiesConstraints.CHARGEPERCENTAGE_MIN_LENGTH,
            "Percentage",
            errorBuilder
            );
    }

    /** Eliminando un impuesto **/
    public ChargeResponse delete(int id){
        Tax charge = validator.validateSoftDeletableEntityExistence(id, taxRepository);
        // List<Taxs> taxs = charge.getTaxs();

        // if(taxs.size() > 0){
        //     charge.setEnabled(false);
        //     taxRepository.save(charge);
        // }
        // else{
            charge.getProducts().clear();
            taxRepository.delete(charge);
        // }
        
        return dtoFactory.createResponse(charge);
    }

    /** Obteniendo TODOS un registro */
    public List<ChargeResponse> get(){
        List<Tax> charges = taxRepository.findAll();
        List<ChargeResponse> dtos = new ArrayList<>();

        for(Tax charge : charges) dtos.add(dtoFactory.createResponse(charge));

        return dtos;
    }

    /** Obteniendo un registro */
    public ChargeResponse get(int id){
        Tax charge  = validator.completeValidationForId(id, taxRepository);
        return dtoFactory.createResponse(charge);
    }

    /** Modificando un registro  */
    public ChargeResponse update(int id, UpdateChargeRequest chargeRequest){
        validateUpdateRequest(id, chargeRequest);
        Tax charge = validateUpdateConflicts(id, chargeRequest);
        charge = taxRepository.save(charge);
        return dtoFactory.createResponse(charge);
    }

    private void validateUpdateRequest(int id, UpdateChargeRequest chargeRequest){
        StringBuilder errors = new StringBuilder();
        validator.validateIdFormat(id, errors);
        if(chargeRequest.getName() != null) 
            validateChargename(chargeRequest.getName(), errors);
        if(chargeRequest.getPercentage() != null)
            validatePercentage(chargeRequest.getPercentage(), errors);
        validateErrors(errors);
    }

    private Tax validateUpdateConflicts(int id, UpdateChargeRequest chargeDto){
        Optional<Tax> result = taxRepository.findByName(chargeDto.getName());
        Tax charge;
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

     private Tax findAndSetChargenameIfNotNull(int id, String chargename)
    {
        Tax charge = validator.completeValidationForId(id, taxRepository);
        if(charge != null)
            charge.setName(chargename);
        return charge;
    }

    private boolean mergeEnabled(UpdateChargeRequest chargeDto, Tax charge)
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
    
    private boolean mergePercentage(UpdateChargeRequest chargeDto, Tax charge)
    {
        Integer dtoPercentage = chargeDto.getPercentage();
        Integer chargePercentage = charge.getPercentage();
        if(dtoPercentage != null && !chargePercentage.equals(dtoPercentage))
        {
            charge.setPercentage(chargeDto.getPercentage());
            return true;
        }
        return false;
    }

    private Tax validateEnabledUserSearchResult(Optional<Tax> result, int requesteId){
        Tax charge = result.get();
        if(charge.getId() != requesteId)
            throw new AlreadyRegisteredException("Chargename not available");
        return charge;
    }
}
