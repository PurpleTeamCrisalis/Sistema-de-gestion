package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.service.Interface.ClientService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.model.order.OrderFactory;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.repository.OrderRepository;
import edu.bootcamp.backoffice.service.Interface.OrderService;
import edu.bootcamp.backoffice.service.Interface.ProductDetailService;
import edu.bootcamp.backoffice.service.Interface.ServiceDetailService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
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
      UserService          userService,
      ClientService        clientService,
      Validator            validator
    )
  {
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
    )
  {
    User user = userService.getUserByUsername(username);
    StringBuilder errorBuilder = new StringBuilder();
    validateOrderDetails(orderDto, errorBuilder);
    Order order = orderFactory.CreateOrderEntityForInsertNewRecord();
    validateAndMergeClient(order, orderDto, errorBuilder);
    validateAndMergeProducts(order, orderDto, errorBuilder);
    validateAndMergeServices(order, orderDto, errorBuilder);
    if (errorBuilder.length() > 0)
      throw new IllegalArgumentException(errorBuilder.toString());
    order.setUser(user);
    completeOrderTotals(order);
    order = orderRepository.save(order);
    return orderFactory.createOrderResponse(order);
  }

  private void completeOrderTotals(Order order)
  {
    double total = 0.00;;
    double acumDiscount = 0.0;
    for(ServiceDetail serviceDetail : order.getServices())
      total = total + completeDetailSubtotal(
              serviceDetail,
              setPriceWithoutTaxes(serviceDetail)
      );
    Double discount = getOrderDiscount(order);
    for(ProductDetail productDetail : order.getProducts()) {
      Double subtotal = completeDetailSubtotal(
              productDetail,
              setPriceWithoutTaxes(productDetail)
      );
      double productDiscount = subtotal * discount;
      double maxDiscount = getMaxDisccount();
      if(productDiscount > maxDiscount)
      {
        productDiscount = maxDiscount;
        discount = productDiscount / subtotal;
      }
      acumDiscount = acumDiscount + productDiscount;
      total = total + subtotal * ( 1 - discount);
    }
    order.setDiscount(acumDiscount);
    order.setTotal(total - order.getDiscount());
  }

  private Double setPriceWithoutTaxes(
          ServiceDetail serviceDetail
    )
  {
    ServiceEntity service = serviceDetail.getService();
    double subtotal = service.getBasePrice();
    if(service.isSpecial())
      subtotal = subtotal + service.getSuportCharge();
    serviceDetail.setPriceWithoutTaxes(subtotal);
    return subtotal;
  }

  private Double setPriceWithoutTaxes(
          ProductDetail productDetail
    )
  {
    Product product = productDetail.getProduct();
    double subtotal = product.getBasePrice();
    if(productDetail.getWarranty() != null)
      subtotal = subtotal * ( 1 + (productDetail.getWarranty() * 0.02));
    productDetail.setPriceWithoutTaxes(subtotal);
    return subtotal * productDetail.getQuantity();
  }

  private Double completeDetailSubtotal(
          OrderDetail orderDetail,
          Double subtotal
    )
  {
    Double percentage = completeDetailTaxFields(orderDetail);
    orderDetail.setSubTotal(subtotal * percentage);
    return orderDetail.getSubTotal();
  }

  private Double completeDetailTaxFields(
          OrderDetail orderDetail
    )
  {
    StringBuilder chargesApplied = new StringBuilder();
    double percentage = 1.00;
    for (Tax tax : orderDetail.getAsset().getAllTaxes())
    {
      percentage = percentage + (tax.getPercentage() / 100.0);
      chargesApplied
              .append(" ")
              .append(tax.getName());
    }
    orderDetail.setTaxesApplied(
            chargesApplied.toString()
    );
    orderDetail.setTaxCharges(percentage*100-100);
    return percentage;
  }

  private Double getOrderDiscount(Order order)
  {
    List<ServiceDetail> serviceDetails = order.getServices();
    if(!serviceDetails.isEmpty())
      order.setDiscountService(
        order.getServices().get(0).getService()
      );
    else
    {/*
      order.setDiscountService(
        clientService.getDiscountService(client)
      );*/
    }
    if(order.getDiscountService() != null)
      return getDiscount(); // GET DISCOUNT
    return 0.0;
  }

  private Double getMaxDisccount()
  {
    return 2500.0;
  }

  private Double getDiscount()
  {
    return 0.1;
  }

  private void validateAndMergeClient(
          Order order,
          OrderRequest orderDto,
          StringBuilder errorBuilder
  )
  {
    StringBuilder niceError = new StringBuilder(" Client:");
    int initLength = niceError.length();
    Client client = clientService.getClientEntity(
            orderDto.getClientId(),
            niceError
    );
    if(niceError.length() > initLength)
      errorBuilder.append(niceError);
    order.setClient(client);
  }

  private void validateAndMergeProducts(
          Order order,
          OrderRequest orderDto,
          StringBuilder errorBuilder
  )
  {
    StringBuilder niceError = new StringBuilder(" Products:");
    int initLength = niceError.length();
    List<ProductDetail> productsDetails = productDetailService.getProductsDetails(
            orderDto.getProducts(),
            niceError,
            order
    );
    if(niceError.length() > initLength)
      errorBuilder.append(niceError);
    order.setProducts(productsDetails);
  }

  private void validateAndMergeServices(
          Order order,
          OrderRequest orderDto,
          StringBuilder errorBuilder
  )
  {
    StringBuilder niceError = new StringBuilder(" Services:");
    int initLength = niceError.length();
    List<ServiceDetail> servicesDetails = serviceDetailService.getServicesDetails(
            orderDto.getServices(),
            niceError,
            order
    );
    if(niceError.length() > initLength)
      errorBuilder.append(niceError);
    order.setServices(servicesDetails);
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

  private void validateOrderDetails (
          OrderRequest orderDto,
          StringBuilder errorBuilder
    )
  {
    if ((orderDto.getProducts() == null || orderDto.getProducts().isEmpty()) &&
        (orderDto.getServices() == null || orderDto.getServices().isEmpty())
    )
      errorBuilder.append("No se recibieron ni productos ni servicios.");
  }
}
