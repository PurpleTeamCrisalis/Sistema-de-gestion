package edu.bootcamp.backoffice.model.product.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Singular;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductRequest {

	@JsonProperty("name")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("basePrice")
	private double basePrice;
	

	@JsonProperty("enabled")
	private Boolean enabled;

	@JsonProperty("taxes")
	@Singular
	private List<ChargeRequest> taxes;

}
