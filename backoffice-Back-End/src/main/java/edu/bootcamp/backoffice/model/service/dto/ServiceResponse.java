package edu.bootcamp.backoffice.model.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ServiceResponse {
	@JsonProperty("id")
	private Integer id;

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

	@JsonProperty("enabled")
	private Boolean enabled;

}
