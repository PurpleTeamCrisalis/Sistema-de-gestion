package edu.bootcamp.backoffice.model.order;

import java.util.ArrayList;
import java.util.Date;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.user.User;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.dto.OrderResponse;

@Component
public class OrderFactory {

  public Order createOrderEntityForInsertNewRecord(
    User user,
    Client client
  ) {
    return Order
        .builder()
        .user(user)
        .client(client)
        .date(new Date())
        .products(new ArrayList<ProductDetail>())
        .services(new ArrayList<ServiceDetail>())
        .build();
  }

  public OrderResponse createResponse(
    Order order
  ) {
    return OrderResponse
      .builder()
      .id(order.getId())
      .date(order.getDate())
      .client(order.getClient())
      .products(order.getProducts())
      .services(order.getServices())
      .build();
  }
}
