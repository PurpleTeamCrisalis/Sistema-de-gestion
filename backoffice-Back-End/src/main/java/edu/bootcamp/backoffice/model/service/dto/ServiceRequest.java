package edu.bootcamp.backoffice.model.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
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
/*
	@JsonProperty("isSpecial")
	private boolean isSpecial;

	@JsonProperty("suportCharge")
	private double suportCharge;
*/
}
