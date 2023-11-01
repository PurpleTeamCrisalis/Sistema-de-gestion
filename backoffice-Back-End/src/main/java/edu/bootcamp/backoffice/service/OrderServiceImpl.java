package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.EmptyElementException;
import edu.bootcamp.backoffice.model.order.OrderFactory;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.repository.OrderRepository;
import edu.bootcamp.backoffice.service.Interface.OrderService;
import edu.bootcamp.backoffice.service.Interface.ProductDetailService;
import edu.bootcamp.backoffice.service.Interface.ServiceDetailService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.user.User;

@Service
public class OrderServiceImpl implements OrderService {

  // Injectar Repository
  private final OrderFactory orderFactory;
  private final OrderRepository orderRepository;
  private final ProductDetailService productDetailService;
  private final ServiceDetailService serviceDetailService;
  private final UserService userService;
  private final ClientService clientService;
  private final Validator validator;

  public OrderServiceImpl(
      ProductDetailService productDetailService,
      ServiceDetailService serviceDetailService,
      OrderFactory         orderFactory,
      OrderRepository      orderRepository,
      ServiceDetailFactory serviceDetailFactory,
      ProductDetailFactory productDetailFactory,
      UserService          userService,
      ClientService        clientService,
      Validator            validator
  ) {
    this.userService          = userService;
    this.clientService        = clientService;
    this.orderFactory         = orderFactory;
    this.orderRepository      = orderRepository;
    this.productDetailService = productDetailService;
    this.serviceDetailService = serviceDetailService;
    this.validator = validator;
  }

  public OrderResponse registerOrder(
    OrderRequest orderDto,
    String username
  ) {
    // Validaciones
    validateOrderDetails(orderDto);
    User user = userService.getUserByUsername(username); // Validacion username.
    Client client = clientService.getClientEntity(orderDto.getClientId()); // Validacion cliente.
    List<ServiceDetail> servicesDetails = serviceDetailService.getServicesDetails(orderDto.getServices()); // Validacion productos. 
    List<ProductDetail> productsDetails = productDetailService.getProductsDetails(orderDto.getProducts()); // Validacion servicios.

    // Creo la ordenEntity
    Order order = orderFactory.CreateOrderEntityForInsertNewRecord(); 
    order.setUser(user);
    order.setClient(client);
    order.setServices(servicesDetails);
    order.setProducts(productsDetails);
    order.calculateTotal();
    
    // BEGIN TRANSACTIONS
    // Guardo la orden en BD (tabla order_table)
    order = orderRepository.save(order);
    // Guardo serviceDetails y productDetails en BD (tablas service_detail y product_detail)
    serviceDetailService.registerServiceDetail(servicesDetails, order);
    productDetailService.registerProductDetail(productsDetails, order);
    
    // Creo y estructuro la OrderResponse
    return orderFactory.createOrderResponse(order); // Return OrderResponse
    // END TRANSACTION
  }

  public OrderResponse get(int id) {
    Order order = validator.completeValidationForId(id, orderRepository);
    return orderFactory.createOrderResponse(order);
  }

  public List<OrderResponse> get() {
    List<Order> orders = orderRepository.findAll();
    List<OrderResponse> dtos = new ArrayList<OrderResponse>();

    for (Order order : orders) {
      dtos.add(orderFactory.createOrderResponse(order));
    }
    
    if (dtos.isEmpty()) {
      throw new EmptyTableException("There aren't registered orders");
    }

    return dtos;
  }

  public OrderResponse delete(int id) {
    Order order = validator.validateIdExistence(id, orderRepository);
    order.setEnabled(false);
    return orderFactory.createOrderResponse(order);
  }

  private void validateOrderDetails (OrderRequest orderDto) {
    if ((orderDto.getProducts() == null || orderDto.getProducts().size() == 0) && 
        (orderDto.getServices() == null || orderDto.getServices().size() == 0)
    )
      throw new EmptyElementException("No se recibieron ni productos ni servicios.");
  }
}
