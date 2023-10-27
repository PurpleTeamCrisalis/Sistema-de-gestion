package edu.bootcamp.backoffice.model.order;

import java.util.Date;
import java.util.List;

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
    OrderRequest orderDTO,
    String username,
    List<ServiceDetail> orderServices,
    List<ProductDetail> orderProducts
  ) {

    // Deberia iterar acá porque sino me llegarian 4 listas.
    // CreateServiceDetailEntity
    // CreateProductDetailEntity

    return Order
        .builder()
        .user(
            userService.getUserByUsername(username))
        .client(
            clientService.getClientById(
                orderDTO.getClientId()))
        .date(new Date())
        .products(orderProducts)
        .services(orderServices)
        .build();
  }
}
