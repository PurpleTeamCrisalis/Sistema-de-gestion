package edu.bootcamp.backoffice.model.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UpdateServiceRequest {

	@JsonProperty("id")
	private Integer id;

	@JsonProperty("name")
	private String name;

	@JsonProperty("description")
	private String description;

	@JsonProperty("basePrice")
	private double basePrice;

	@JsonProperty("isSpecial")
	private Boolean isSpecial;

	@JsonProperty("suportCharge")
	private double suportCharge;

	@JsonProperty("enabled")
	private Boolean enabled;

}
