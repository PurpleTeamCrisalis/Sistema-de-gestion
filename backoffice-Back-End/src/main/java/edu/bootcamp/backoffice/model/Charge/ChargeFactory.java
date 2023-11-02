package edu.bootcamp.backoffice.model.Charge;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;

@Component
public class ChargeFactory {
    //Lo que vamos a recibir
    public Charge CreateEntityForInsertNewRecord(ChargeRequest chargeDTO){
        //Entity(char) 
        return Charge
                .builder()
                .name(chargeDTO.getName())
                .percentage(chargeDTO.getPercentage())
                .enabled(true)
                .build();
    }

    //Lo que vamos a devolver
    public ChargeResponse createResponse(Charge charge){
        //? Lo hacemos por seguridad y flexibilidad
        return ChargeResponse
                .builder()
                .name(charge.getName())
                .percentage(charge.getPercentage())
                .enabled(charge.isEnabled())
                .id(charge.getId())
                .build();
    }
}
