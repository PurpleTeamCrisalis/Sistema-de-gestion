package edu.bootcamp.backoffice.model.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UpdateProductRequest {

	@JsonProperty("name")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("basePrice")
	private double basePrice;

	@JsonProperty("enabled")
	private Boolean enabled;

}