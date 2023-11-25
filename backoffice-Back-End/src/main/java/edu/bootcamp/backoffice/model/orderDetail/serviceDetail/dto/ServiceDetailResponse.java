package edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class ServiceDetailResponse {
  @JsonProperty("id")
  private Integer id;
  
  @JsonProperty("serviceId")
  private Integer serviceId;

  @JsonProperty("subTotal")
  private Double subTotal;
/*
  @JsonProperty("taxesApplied")
  private String taxesApplied;

  @JsonProperty("taxCharges")
  private Double taxCharges;
*/
  @JsonProperty("name")
  private String name;

  @JsonProperty("basePrice")
  private Double basePrice;
}