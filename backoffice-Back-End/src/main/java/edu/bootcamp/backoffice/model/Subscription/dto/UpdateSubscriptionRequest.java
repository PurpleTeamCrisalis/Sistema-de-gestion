package edu.bootcamp.backoffice.model.Subscription.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UpdateSubscriptionRequest {
    @JsonProperty("clientId")
    private Integer clientId;

    @JsonProperty("serviceId")
    private Integer serviceId;

    @JsonProperty("enabled")
    private boolean enabled;
}
