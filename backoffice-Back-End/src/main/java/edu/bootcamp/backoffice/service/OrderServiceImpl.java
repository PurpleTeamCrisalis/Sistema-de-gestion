package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

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
import edu.bootcamp.backoffice.model.product.Product;

@Service
public class OrderServiceImpl implements OrderService {

  // Injectar Repository
  private final OrderFactory orderFactory;
  private final OrderRepository orderRepository;
  private final ServiceDetailFactory serviceDetailFactory;
  private final ProductDetailFactory productDetailFactory;
  // private final ProductService productService;
  // private final ServiceService serviceService;

  public OrderServiceImpl(
      OrderFactory orderFactory,
      OrderRepository orderRepository,
      ServiceDetailFactory serviceDetailFactory,
      ProductDetailFactory productDetailFactory
      // ProductService productService
  ) {
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

    // Product product = productService.getProductById(productDetailDTO.getProductId());
    // List<ServiceDetail> orderServices = getOrderServicesDetails(orderDto.getServices()); -> No va acá
    // List<ProductDetail> orderProducts = getOrderProductsDetails(orderDto.getProducts()); -> No va acá

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
  public OrderResponse get(int id) {
    // TODO Auto-generated method stub
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

  private List<ServiceDetail> getOrderServicesDetails(List<ServiceDetailRequest> servicesRequestsForOrder) {
    List<ServiceDetail> orderServices = new ArrayList<ServiceDetail>();
    for (ServiceDetailRequest serviceDetailRequest : servicesRequestsForOrder) {
      ServiceDetail serviceDetail = serviceDetailFactory.CreateServiceDetailEntity(serviceDetailRequest);
      orderServices.add(serviceDetail);
    }
    return orderServices;
  }

  private List<ProductDetail> getOrderProductsDetails(List<ProductDetailRequest> productsRequestsForOrder) {
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
