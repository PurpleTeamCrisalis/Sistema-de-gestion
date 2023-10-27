package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.order.OrderFactory;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.order.dto.UpdateOrderRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.repository.OrderRepository;
import edu.bootcamp.backoffice.service.Interface.OrderService;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;

@Service
public class OrderServiceImpl implements OrderService {

  // Injectar Repository
  private final OrderFactory orderFactory;
  private final OrderRepository orderRepository;
  private final ServiceDetailFactory serviceDetailFactory;
  private final ProductDetailFactory productDetailFactory;
  private final UserService userService;
  private final ClientService clientService;
 // private final ServiceService serviceService;
  // private final ProductService productService;
  // private final ServiceService serviceService;

  public OrderServiceImpl(
      OrderFactory orderFactory,
      OrderRepository orderRepository,
      ServiceDetailFactory serviceDetailFactory,
      ProductDetailFactory productDetailFactory,
      UserService userService,
      ClientService clientService
      //ServiceService serviceService,
      // ProductService productService
  ) {
    //this.serviceService = serviceService;
    this.userService = userService;
    this.clientService = clientService;
    this.orderFactory = orderFactory;
    this.orderRepository = orderRepository;
    this.serviceDetailFactory = serviceDetailFactory;
    this.productDetailFactory = productDetailFactory;
    // this.productService = productService;
  }

  @Override
  public OrderResponse registerOrder(
    OrderRequest orderDto,
    String username
  ) {
    // Validar correct username ( eventualmente el token puede estar mal formado )
    User user = userService.getUserByUsername(username);
    // Valido id cliente
    Client client = clientService.getClientById(orderDto.getClientId());
    Order order = orderFactory.CreateOrderEntity(user, client);

    // BEGIN TRANSACTIONS

    // Repository.Insert order
    validateAndInsertOrderServicesDetails(
            orderDto.getServices(),
            order
    );

    //Lo mismo para ProductDetails

    // END TRANSACTION

    // CREAR OrderResponse

    return null; // Return OrderResponse
  }

  @Override
  public OrderResponse get(int id) {
    // TODO Auto-generated method stub

    // Plan A Didactico
    // convertir el dtoRequest en un entity
    // convertir la entity en dtoResponse con los datos del dtoRequest
    // retornas la dtoResponse

    // Plan B Practico
    // Ignorar la request y la factory
    // Crear un new dtoResponse() y retornalo

    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  @Override
  public List<OrderResponse> get() throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  @Override
  public OrderResponse update(int id, UpdateOrderRequest OrderDto) throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'update'");
  }

  @Override
  public OrderResponse delete(int id) throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }

  private void validateAndInsertOrderServicesDetails(
          List<ServiceDetailRequest> servicesRequestsForOrder,
          Order order
    )
  {
    for (ServiceDetailRequest serviceDetailRequest : servicesRequestsForOrder) {

      ServiceEntity service = null;
      //Service service = serviceService.getServiceById(serviceDetailDTO.getServiceId());

      ServiceDetail serviceDetail = serviceDetailFactory.CreateServiceDetailEntity(order, service);

      // REPOSITORY.save(serviceDetail)

      order.getServices().add(serviceDetail);
    }
  }

  private List<ProductDetail> validateAndInsertOrderProductsDetails(
          List<ProductDetailRequest> productsRequestsForOrder
  ) {
    List<ProductDetail> orderProducts = new ArrayList<ProductDetail>();
    for (ProductDetailRequest productDetailRequest : productsRequestsForOrder) {

      ProductDetail productDetail = productDetailFactory.CreateProductDetailEntity(productDetailRequest);

      orderProducts.add(productDetail);
    }
    return orderProducts;
  }

  // private Float calculateOrderTotal() {
  // }

}
