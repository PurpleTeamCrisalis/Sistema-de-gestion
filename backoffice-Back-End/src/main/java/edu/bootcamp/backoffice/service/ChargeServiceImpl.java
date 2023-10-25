package edu.bootcamp.backoffice.service;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.Charge.Charge;
import edu.bootcamp.backoffice.model.Charge.ChargeFactory;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import edu.bootcamp.backoffice.service.Interface.ChargeService;

@Service //Implementamos la interfaz de ChargeService
public class ChargeServiceImpl implements ChargeService{
    private final ChargeFactory dtoFactory;

    public ChargeServiceImpl(
        ChargeFactory dtoFactory
    ){
        this.dtoFactory = dtoFactory;
    }
    //Creamos la logica de las funciones creada en la interfaz
    /** Creando nuevo Cargo **/
    public ChargeResponse createCharge(ChargeRequest chargeRequest){
        Charge charge = dtoFactory.CreateEntityForInsertNewRecord(chargeRequest);
        return dtoFactory.createResponse(charge);
    }


}
