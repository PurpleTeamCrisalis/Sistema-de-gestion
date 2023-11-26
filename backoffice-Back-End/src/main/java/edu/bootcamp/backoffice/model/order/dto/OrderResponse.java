package edu.bootcamp.backoffice.model.order.dto;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.order.OrderState;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderResponse {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("date")
  private String date;

  @JsonProperty("total")
  private Double total;

  @JsonProperty("client")
  private ClientResponse client;
  
  @JsonProperty("order_state")
  @Enumerated(EnumType.STRING)
  private  OrderState orderState;

  @JsonProperty("discountService")
  private ServiceResponse discountService;

  @JsonProperty("totalDiscount")
  private Double totalDiscount;

  @JsonProperty("enabled")
  private Boolean enabled;

  @JsonProperty("products")
  @Singular
  private List<ProductDetailResponse> products;

  @JsonProperty("services")
  @Singular
  private List<ServiceDetailResponse> services;
}