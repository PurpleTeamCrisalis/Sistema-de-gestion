package edu.bootcamp.backoffice.model.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientResponse {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("dni")
    private Integer dni;

    @JsonProperty("phone")
    private Long phone;

    @JsonProperty("adress")
    private String adress;

    @JsonProperty("startdate")
    private Date startdate;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("isbussiness")
    private Boolean isbussiness;

    @JsonProperty("bussinessname")
    private String bussinessname;

    @JsonProperty("cuit")
    private Long cuit;

    @JsonProperty("subscriptionsByServices")
    @Singular
    private List<SubscriptionResponse> subscriptions;
}
