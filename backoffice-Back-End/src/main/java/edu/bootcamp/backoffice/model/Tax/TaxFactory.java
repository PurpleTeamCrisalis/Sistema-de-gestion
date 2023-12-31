package edu.bootcamp.backoffice.model.Tax;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;

@Component
@NoArgsConstructor
public class TaxFactory {
    //Lo que vamos a recibir
    public Tax CreateEntityForInsertNewRecord(ChargeRequest chargeDTO){
        //Entity(char) 
        return Tax
                .builder()
                .name(chargeDTO.getName())
                .percentage(chargeDTO.getPercentage())
                .enabled(true)
                .build();
    }

    //Lo que vamos a devolver
    public ChargeResponse createResponse(Tax charge){
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
