package edu.bootcamp.backoffice.model.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Tax.dto.UpdateChargeRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Singular;

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
	
	@JsonProperty("taxes")
	@Singular
	private List<UpdateChargeRequest> taxes;

}
