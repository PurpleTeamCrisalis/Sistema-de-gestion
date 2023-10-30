package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.NotCreatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.model.order.OrderFactory;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.repository.OrderRepository;
import edu.bootcamp.backoffice.service.Interface.OrderService;
import edu.bootcamp.backoffice.service.Interface.ProductDetailService;
import edu.bootcamp.backoffice.service.Interface.ServiceDetailService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
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
      OrderFactory orderFactory,
      OrderRepository orderRepository,
      ServiceDetailFactory serviceDetailFactory,
      ProductDetailFactory productDetailFactory,
      UserService userService,
      ClientService clientService,
      Validator validator
  ) {
    this.userService = userService;
    this.clientService = clientService;
    this.orderFactory = orderFactory;
    this.orderRepository = orderRepository;
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
    Client client = clientService.getClient(orderDto.getClientId()); // Validacion cliente.
    List<ServiceDetail> servicesDetails = serviceDetailService.getServicesDetails(orderDto.getServices()); // Validacion productos. 
    List<ProductDetail> productsDetails = productDetailService.getProductsDetails(orderDto.getProducts()); // Validacion servicios.

    // Creo la ordenEntity
    Order order = orderFactory.CreateOrderEntityForInsertNewRecord(); 
    order.setUser(user);
    order.setClient(client);
    setServicesDetailsIntoOrder(servicesDetails, order);
    setProductsDetailsIntoOrder(productsDetails, order);
    order.calculateTotal();
    
    // BEGIN TRANSACTIONS
    // Guardo la orden en BD (tabla order_table)
    order = orderRepository.save(order);
    
    // Creo y estructuro la OrderResponse
    return createAndGetOrderResponse(order); // Return OrderResponse
    // END TRANSACTION
  }

  public OrderResponse get(int id) {
    Order order = validator.completeValidationForId(id, orderRepository);
    return createAndGetOrderResponse(order);
  }

  public List<OrderResponse> get() {
    List<Order> orders = orderRepository.findAll();
    List<OrderResponse> dtos = new ArrayList<OrderResponse>();

    for (Order order : orders) {
      dtos.add(createAndGetOrderResponse(order));
    }
    
    if (dtos.isEmpty()) {
      throw new EmptyTableException("There aren't registered orders");
    }

    return dtos;
  }

  // public OrderResponse update(int id, UpdateOrderRequest OrderDto) throws InvalidIdFormatException {
  //   // TODO Auto-generated method stub
  //   throw new UnsupportedOperationException("Unimplemented method 'update'");
  // }

  public OrderResponse delete(int id) {
    Order order = validator.validateIdExistence(id, orderRepository);
    order.setEnabled(false);
    return createAndGetOrderResponse(order);
  }

  private void setServicesDetailsIntoOrder(List<ServiceDetail> services, Order order) {
    for(ServiceDetail serviceDetail : services) {
      order.getServices().add(serviceDetail);
      serviceDetail.setOrder(order);
    }
  }

  private void setProductsDetailsIntoOrder(List<ProductDetail> products,Order order) {
    for(ProductDetail productDetail : products) {
      order.getProducts().add(productDetail);
      productDetail.setOrder(order);
    }
  }

  private OrderResponse createAndGetOrderResponse(Order order) {
    List<ProductDetailResponse> productsResponse = productDetailService.getProductsDetailsByOrder(order.getId());
    List<ServiceDetailResponse> servicesResponse = serviceDetailService.getServicesDetailsByOrder(order.getId());
    ClientResponse clientResponse = clientService.getClientResponse(order.getClient().getId());
    return orderFactory.CreateResponse(order, servicesResponse, productsResponse, clientResponse);
  }

  private void validateOrderDetails (OrderRequest orderDto) {
    if (orderDto.getProducts().size() == 0 && orderDto.getServices().size() == 0)
      throw new NotCreatedException("Empty services and products lists");
  }
}
