package edu.bootcamp.backoffice.model.Charge.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@Builder

//Lo que nos va a mandar el usuario con el JSON
public class ChargeRequest {
    @JsonProperty("name")
    private String chargeName;
    
    @JsonProperty("percentage")
    private Integer chargePercentage;

}
