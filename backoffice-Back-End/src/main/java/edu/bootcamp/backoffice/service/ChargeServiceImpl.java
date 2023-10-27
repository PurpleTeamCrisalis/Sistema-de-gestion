package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;
import java.util.Optional;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.Charge.Charge;
import edu.bootcamp.backoffice.model.Charge.ChargeFactory;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.order.ChargeConstraints;
import edu.bootcamp.backoffice.repository.ChargeRepository;
import edu.bootcamp.backoffice.service.Interface.ChargeService;

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


    /** Eliminando un impuesto **/

}
