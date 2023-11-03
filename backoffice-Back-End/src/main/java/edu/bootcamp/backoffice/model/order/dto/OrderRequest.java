package edu.bootcamp.backoffice.model.order.dto;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderRequest {
  @JsonProperty("clientId")
  private Integer clientId;

  @JsonProperty("services")
  @Singular
  private List<ServiceDetailRequest> services;

  @JsonProperty("products")
  @Singular
  private List<ProductDetailRequest> products;
}