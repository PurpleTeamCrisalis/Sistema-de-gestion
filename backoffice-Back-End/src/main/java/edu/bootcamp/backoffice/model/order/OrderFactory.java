package edu.bootcamp.backoffice.model.order;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.user.User;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.dto.OrderResponse;

@Component
public class OrderFactory {

  public Order CreateOrderEntityForInsertNewRecord() {
    Order order = Order
        .builder()
        .products(new ArrayList<ProductDetail>())
        .services(new ArrayList<ServiceDetail>())
        .total(0.00)
        .enabled(true)
        .build();
    order.getFormattedDate();
    return order;
  }

  public OrderResponse CreateResponse(
    Order order,
    List<ServiceDetailResponse> services,
    List<ProductDetailResponse> products,
    ClientResponse client
  ) {
    return OrderResponse
      .builder()
      .id(order.getId())
      .date(order.getDate())
      .enabled(order.isEnabled())
      .client(client)
      .products(products)
      .services(services)
      .total(order.getTotal())
      .build();
  }
}
