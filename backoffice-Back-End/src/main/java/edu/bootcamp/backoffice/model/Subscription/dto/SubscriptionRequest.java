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
public class SubscriptionRequest {

    @JsonProperty("clientId")
    private Integer clientId;

}
