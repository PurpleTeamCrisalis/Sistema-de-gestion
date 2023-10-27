package edu.bootcamp.backoffice.model.order;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.user.User;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.UserService;

@Component
public class OrderFactory {

  private final ClientService clientService;
  private final UserService userService;

  public OrderFactory(
    ClientService clientService,
    UserService userService
  ) {
    this.clientService = clientService;
    this.userService = userService;
  }

  public Order CreateOrderEntity(
    User user,
    Client client
  ) {

    // Deberia iterar acá porque sino me llegarian 4 listas.
    // CreateServiceDetailEntity
    // CreateProductDetailEntity

    return Order
        .builder()
        .user(user)
        .client(client)
        .date(new Date())
        .build();
  }


}
