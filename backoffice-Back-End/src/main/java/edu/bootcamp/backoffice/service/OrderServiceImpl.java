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

import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
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
import edu.bootcamp.backoffice.service.Interface.Validator;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.product.Product;

@Service
public class OrderServiceImpl implements OrderService {

  // Injectar Repository
  private final OrderFactory orderFactory;
  private final OrderRepository orderRepository;
  private final ServiceDetailFactory serviceDetailFactory;
  private final ProductDetailFactory productDetailFactory;
  private final UserService userService;
  private final ClientService clientService;
  private final Validator validator;
  // private final ServiceService serviceService;
  // private final ProductService productService;

  public OrderServiceImpl(
    // ServiceService serviceService,
    // ProductService productService,
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
    this.serviceDetailFactory = serviceDetailFactory;
    this.productDetailFactory = productDetailFactory;
    this.validator = validator;
    // this.serviceService = serviceService;
    // this.productService = productService;
  }

  @Override
  public OrderResponse registerOrder(
    OrderRequest orderDto,
    String username
  ) {
    User user = userService.getUserByUsername(username); // Validar correct username ( eventualmente el token puede estar mal formado )
    Client client = clientService.getClientById(orderDto.getClientId()); // Valido id cliente
    Order order = orderFactory.createOrderEntityForInsertNewRecord(user, client); // Creo la ordenEntity

    // BEGIN TRANSACTIONS
    // Repository.Insert order
    validateAndInsertServicesDetails(orderDto.getServices(), order);
    // Lo mismo para ProductDetails
    validateAndInsertProductsDetails(orderDto.getProducts(), order);
    // Agregar el total
    // calculateOrderTotal()
    // END TRANSACTION


    order = orderRepository.save(order);
    // CREAR OrderResponse
    return orderFactory.createResponse(order); // Return OrderResponse
  }

  @Override
  public OrderResponse get(int id) {
    Order order = validator.completeValidationForId(id, orderRepository);
    return orderFactory.createResponse(order);
  }

  @Override
  public List<OrderResponse> get() {
    List<Order> orders = orderRepository.findAll();
    List<OrderResponse> dtos = new ArrayList<OrderResponse>();

    for (Order order : orders) {
      dtos.add(orderFactory.createResponse(order));
    }
    
    if (dtos.isEmpty()) {
      throw new EmptyTableException("There aren't registered orders");
    }

    return dtos;
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

  private void validateAndInsertServicesDetails(
    List<ServiceDetailRequest> servicesRequestsForOrder,
    Order order
  ) {
    for (ServiceDetailRequest serviceDetailRequest : servicesRequestsForOrder) {
      ServiceEntity service = null; //serviceService.getServiceById(serviceDetailRequest.getId())
      ServiceDetail serviceDetail = serviceDetailFactory.CreateServiceDetailEntity(order, service);
      // REPOSITORY.save(serviceDetail)
      order.getServices().add(serviceDetail);
    }
  }

  private void validateAndInsertProductsDetails(
    List<ProductDetailRequest> productsRequestsForOrder, 
    Order order
  ) {
    for (ProductDetailRequest productDetailRequest : productsRequestsForOrder) {
      Product product = null; // productService.getProductById(productDetailRequest.getId())
      ProductDetail productDetail = productDetailFactory.CreateProductDetailEntity(productDetailRequest,product, order);
      order.getProducts().add(productDetail);
    }
  }

  // private Float calculateOrderTotal() {
  // }

  // private validateOrderProductsDetails () {
      
  // }
  // private validateOrderServicesDetails () {

  // }

}
