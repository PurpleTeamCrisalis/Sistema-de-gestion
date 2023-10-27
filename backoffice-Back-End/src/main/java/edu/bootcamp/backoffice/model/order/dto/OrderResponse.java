package edu.bootcamp.backoffice.model.order.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.user.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderResponse {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("date")
  private Date date;

  @JsonProperty("total")
  private Float total;

  // @JsonProperty("user")
  // private User user;

  @JsonProperty("client")
  private Client client;

  // @JsonProperty("discountService")
  // private

  @JsonProperty("products")
  @Singular
  private List<ProductDetail> products;

  @JsonProperty("services")
  @Singular
  private List<ServiceDetail> services;
}