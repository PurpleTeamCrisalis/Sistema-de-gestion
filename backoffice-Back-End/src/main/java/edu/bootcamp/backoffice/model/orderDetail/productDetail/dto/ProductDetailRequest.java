package edu.bootcamp.backoffice.model.orderDetail.productDetail.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductDetailRequest {
  @JsonProperty("productId")
  private Integer productId;

  @JsonProperty("quantity")
  private Integer quantity;

  @JsonProperty("warranty")
  private Float warranty;
}
