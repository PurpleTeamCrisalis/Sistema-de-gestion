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
public class ServiceDetailRequest {
  @JsonProperty("serviceId")
  private Integer serviceId;
}
