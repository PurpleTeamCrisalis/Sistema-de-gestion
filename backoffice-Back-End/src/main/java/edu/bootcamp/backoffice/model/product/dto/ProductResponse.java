package edu.bootcamp.backoffice.model.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductResponse {
	@JsonProperty("id")
	private Integer id;

	@JsonProperty("name")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("basePrice")
	private double basePrice;

	@JsonProperty("enabled")
	private Boolean enabled;

}
