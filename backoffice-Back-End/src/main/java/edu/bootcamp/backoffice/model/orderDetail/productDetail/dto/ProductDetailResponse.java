package edu.bootcamp.backoffice.model.orderDetail.productDetail.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class ProductDetailResponse {
  @JsonProperty("productId")
  private Integer productId;

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("quantity")
  private Integer quantity;

  @JsonProperty("subTotal")
  private Double subTotal;

  @JsonProperty("taxesApplied")
  private String taxesApplied;
  /*
   * @JsonProperty("taxCharges")
   * private Double taxCharges;
   */
  @JsonProperty("name")
  private String name;

  @JsonProperty("basePrice")
  private Double basePrice;
}
