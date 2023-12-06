package edu.bootcamp.backoffice.model.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import lombok.*;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;

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

	@JsonProperty("taxes")
	@Singular
	private List<ChargeResponse> taxes;

	@JsonProperty("subscriptionsByServices")
	@Singular
	private List<SubscriptionResponse> subscriptions;

}
