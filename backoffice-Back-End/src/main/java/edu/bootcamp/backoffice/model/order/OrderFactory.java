package edu.bootcamp.backoffice.model.order;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.taxByOrder.TaxByOrder;
import edu.bootcamp.backoffice.model.taxByOrder.TaxByOrderFactory;
import edu.bootcamp.backoffice.model.taxByOrder.dto.TaxByOrderResponse;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.dto.OrderResponse;

@Component
public class OrderFactory {

  private final ClientFactory clientFactory;
  private final ServiceFactory serviceFactory;
  private final ProductDetailFactory productDetailFactory;
  private final ServiceDetailFactory serviceDetailFactory;
  private final TaxByOrderFactory taxByOrderFactory;

  public OrderFactory (
          ClientFactory clientFactory,
          ServiceFactory serviceFactory,
          ProductDetailFactory productDetailFactory,
          ServiceDetailFactory serviceDetailFactory,
          TaxByOrderFactory taxByOrderFactory
    )
  {
    this.clientFactory        = clientFactory;
    this.serviceFactory       = serviceFactory;
    this.productDetailFactory = productDetailFactory;
    this.serviceDetailFactory = serviceDetailFactory;
    this.taxByOrderFactory    = taxByOrderFactory;
  }

	public Order CreateOrderEntityForInsertNewRecord() {
		Order order = new Order();
        order.setOrderState(OrderState.PENDIENT_TO_PAY);
		order.getFormattedDate();
		order.setEnabled(true);
		return order;
	}

  public OrderResponse CreateResponse(
    Order order,
    List<ServiceDetailResponse> services,
    List<ProductDetailResponse> products,
    ClientResponse client,
    ServiceResponse discountService,
    List<TaxByOrderResponse> taxesByOrder
  ) {
    return OrderResponse
      .builder()
      .id(order.getId())
            .orderState(order.getOrderState())
      .date(order.getDate())
      .enabled(order.isEnabled())
      .client(client)
      .products(products)
      .services(services)
      .taxesByOrder(taxesByOrder)
      .total(order.getTotal())
      .discountService(discountService)
      .totalDiscount(order.getTotalDiscount())
      .build();
  }

  public OrderResponse createOrderResponse(Order order) {
    List<ProductDetailResponse> productsResponse = createProductDetailResponses(order.getProducts());
    List<ServiceDetailResponse> servicesResponse = createServiceDetailResponses(order.getServices());
    List<TaxByOrderResponse> taxesByOrder = createTaxesByOrderResponses(order.getTaxesByOrder());
    ClientResponse clientResponse = clientFactory.createResponse(order.getClient());
    ServiceResponse serviceDiscount = null;
    if(order.getDiscountService() != null)
      serviceDiscount = serviceFactory.createServiceResponse(order.getDiscountService());

    return CreateResponse(order, servicesResponse, productsResponse, clientResponse, serviceDiscount, taxesByOrder);
  }

  private List<TaxByOrderResponse> createTaxesByOrderResponses(List<TaxByOrder> taxesByOrder) {
    List<TaxByOrderResponse> taxByOrderResponses = new ArrayList<>();
    if(taxesByOrder != null)
      for(TaxByOrder taxByOrder : taxesByOrder) {
        TaxByOrderResponse taxByOrderResponse = taxByOrderFactory.createResponse(taxByOrder);
        taxByOrderResponses.add(taxByOrderResponse);
      }
    return taxByOrderResponses;
  }

  private List<ProductDetailResponse> createProductDetailResponses(List<ProductDetail> productDetails) {
    List<ProductDetailResponse> productResponses = new ArrayList<ProductDetailResponse>();
    if(productDetails != null)
      for(ProductDetail productDetail : productDetails) {
        ProductDetailResponse productDetailResponse = productDetailFactory.createResponse(productDetail);
        productResponses.add(productDetailResponse);
      }
    return productResponses;
  }

  private List<ServiceDetailResponse> createServiceDetailResponses(List<ServiceDetail> serviceDetails) {
    List<ServiceDetailResponse> servicesResponses = new ArrayList<ServiceDetailResponse>();
    for(ServiceDetail serviceDetail : serviceDetails) {
      ServiceDetailResponse serviceDetailResponse = serviceDetailFactory.createResponse(serviceDetail);
      servicesResponses.add(serviceDetailResponse);
    }
    return servicesResponses;
  }
}
