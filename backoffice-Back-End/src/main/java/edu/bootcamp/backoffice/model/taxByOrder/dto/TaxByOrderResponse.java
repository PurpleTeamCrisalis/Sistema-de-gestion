package edu.bootcamp.backoffice.model.taxByOrder.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TaxByOrderResponse {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("tax")
    private ChargeResponse tax;

    @JsonProperty("amount")
    private double amount;
}