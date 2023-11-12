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
public class SubscriptionResponse {

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("id")
    private Integer id;
}
