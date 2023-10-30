package edu.bootcamp.backoffice.model.order;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.user.User;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.dto.OrderResponse;

@Component
public class OrderFactory {

  private final ClientFactory clientFactory;
  private final ProductDetailFactory productDetailFactory;
  private final ServiceDetailFactory serviceDetailFactory;

  public OrderFactory (
    ClientFactory clientFactory,
    ProductDetailFactory productDetailFactory,
    ServiceDetailFactory serviceDetailFactory
  ) {
    this.clientFactory        = clientFactory;
    this.productDetailFactory = productDetailFactory;
    this.serviceDetailFactory = serviceDetailFactory;
  }

  public Order CreateOrderEntityForInsertNewRecord() {
    Order order = new Order();
        // .builder()
        // .products(new ArrayList<ProductDetail>())
        // .services(new ArrayList<ServiceDetail>())
        // .total(0.00)
        // .enabled(true)
        // .build();
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
      // .enabled(order.isEnabled())
      .client(client)
      .products(products)
      .services(services)
      .total(order.getTotal())
      .build();
  }

  public OrderResponse createOrderResponse(Order order) {
    List<ProductDetailResponse> productsResponse = createProductDetailResponses(order.getProducts());
    List<ServiceDetailResponse> servicesResponse = createServiceDetailResponses(order.getServices());
    ClientResponse clientResponse = clientFactory.createResponse(order.getClient());
    return CreateResponse(order, servicesResponse, productsResponse, clientResponse);
  }

  private List<ProductDetailResponse> createProductDetailResponses(List<ProductDetail> productDetails) {
    List<ProductDetailResponse> productResponses = new ArrayList<ProductDetailResponse>();
    for(ProductDetail productDetail : productDetails) {
      ProductDetailResponse productDetailResponse = productDetailFactory.CreateResponse(productDetail);
      productResponses.add(productDetailResponse);
    }
    return productResponses;
  }

  private List<ServiceDetailResponse> createServiceDetailResponses(List<ServiceDetail> serviceDetails) {
    List<ServiceDetailResponse> servicesResponses = new ArrayList<ServiceDetailResponse>();
    for(ServiceDetail serviceDetail : serviceDetails) {
      ServiceDetailResponse serviceDetailResponse = serviceDetailFactory.CreateResponse(serviceDetail);
      servicesResponses.add(serviceDetailResponse);
    }
    return servicesResponses;
  }
}
