package edu.bootcamp.backoffice.model.order.dto;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.taxByOrder.dto.TaxByOrderResponse;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("date")
  private Date date;

  @JsonProperty("total")
  private Double total;

  @JsonProperty("client")
  private ClientResponse client;

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

  @JsonProperty("taxes")
  //@Singular
  private List<TaxByOrderResponse> taxesByOrder;
}