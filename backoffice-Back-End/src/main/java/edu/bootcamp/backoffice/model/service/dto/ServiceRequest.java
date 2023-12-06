package edu.bootcamp.backoffice.model.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Singular;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
public class ServiceRequest {

	@JsonProperty("name")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("basePrice")
	private double basePrice;

	@JsonProperty("isSpecial")
	private boolean isSpecial;

	@JsonProperty("suportCharge")
	private double suportCharge;
	
	@JsonProperty("taxes")
	@Singular
	private List<ChargeRequest> taxes;

}
