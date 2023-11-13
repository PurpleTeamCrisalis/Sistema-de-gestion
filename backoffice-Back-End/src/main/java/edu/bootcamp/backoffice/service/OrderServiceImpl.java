package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import edu.bootcamp.backoffice.config.AppConstants;
import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
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
  private final AppConstants appConstants;

  public OrderServiceImpl(
      ProductDetailService productDetailService,
      ServiceDetailService serviceDetailService,
      OrderFactory         orderFactory,
      OrderRepository      orderRepository,
      UserService          userService,
      ClientService        clientService,
      Validator            validator,
      AppConstants         appConstants
    )
  {
    this.userService          = userService;
    this.clientService        = clientService;
    this.orderFactory         = orderFactory;
    this.orderRepository      = orderRepository;
    this.productDetailService = productDetailService;
    this.serviceDetailService = serviceDetailService;
    this.validator            = validator;
    this.appConstants         = appConstants;
  }

  public OrderResponse registerOrder(
    OrderRequest orderDto,
    String username
    )
  {
    User user = userService.getUserByUsername(username);
    StringBuilder errorBuilder = new StringBuilder();
    Order order = orderFactory.CreateOrderEntityForInsertNewRecord();
    validateAndMergeClient(order, orderDto, errorBuilder);
    validateAndMergeItems(order, orderDto, errorBuilder);
    if (errorBuilder.length() > 0)
      throw new IllegalArgumentException(errorBuilder.toString());
    order.setUser(user);
    completeOrderTotals(order);
    order = orderRepository.save(order);
    return orderFactory.createOrderResponse(order);
  }

  private void validateAndMergeItems(
          Order order,
          OrderRequest orderDto,
          StringBuilder errorBuilder
    )
  {
    List<ServiceDetailRequest> services = orderDto.getServices();
    Boolean withServices = services != null && ! services.isEmpty();
    List<ProductDetailRequest> products = orderDto.getProducts();
    Boolean withProducts =  products != null && ! products.isEmpty();
    if(withServices)
      validateAndMergeServices(order, orderDto, errorBuilder);
    if(withProducts)
      validateAndMergeProducts(order, orderDto, errorBuilder);
    if(!(withProducts||withServices))
      errorBuilder.append("The order has no items");
  }

  private void completeOrderTotals(Order order)
  {
    double totalWithoutDiscount = completeServicesSubtotal(
            order.getServices()
    );
    double productsSubtotal = completeProductsSubtotal(
            order.getProducts()
    );
    completeOrderDiscount(order, productsSubtotal);
    totalWithoutDiscount += productsSubtotal - order.getTotalDiscount();
    order.setTotal(totalWithoutDiscount);
  }

  private void completeOrderDiscount(
          Order order,
          Double productsSubtotal
    )
  {
    setOrderDiscountService(order);
    Double discountFactor = getDiscountFactor(order);
    Double productDiscount = getOrderDiscount(
            productsSubtotal,
            discountFactor
    );
    order.setTotalDiscount(productDiscount);
  }

  private Double completeServicesSubtotal(
          List<ServiceDetail> services
    )
  {
    double total = 0.0;
    for(ServiceDetail serviceDetail : services)
    {
      setServicePriceWithoutTaxes(serviceDetail);
      completeDetailSubtotal(serviceDetail);
      total += serviceDetail.getSubTotal();
    }
    return total;
  }

  private Double completeProductsSubtotal(
          List<ProductDetail> productDetails
    )
  {
    double total = 0.0;
    for(ProductDetail productDetail : productDetails)
    {
      setProductPriceWithoutTaxes(productDetail);
      completeDetailSubtotal(productDetail);
      Double subtotal = productDetail.getSubTotal();
      subtotal *= productDetail.getQuantity();
      productDetail.setSubTotal(subtotal);
      total += subtotal;
    }
    return total;
  }

  private Double getOrderDiscount(
          Double productsSubtotal,
          Double discountFactor
    )
  {
    double orderDiscount = productsSubtotal * discountFactor;
    double maxDiscount = appConstants.getMaxOrderDiscount();
    if(orderDiscount > maxDiscount)
      orderDiscount = maxDiscount;
    return orderDiscount;
  }

  private Double setServicePriceWithoutTaxes(
          ServiceDetail serviceDetail
    )
  {
    ServiceEntity service = serviceDetail.getService();
    double subtotal = service.getBasePrice();
    if(service.isSpecial())
      subtotal += service.getSuportCharge();
    serviceDetail.setPriceWithoutTaxes(subtotal);
    return subtotal;
  }

  private void setProductPriceWithoutTaxes(
          ProductDetail productDetail
    )
  {
    Product product = productDetail.getProduct();
    double subtotal = product.getBasePrice();
    if(productDetail.getWarranty() != null)
    {
      Double yearWarrantyFactor = appConstants.getYearWarrantyFactor();
      Double warrantyYears = productDetail.getWarranty();
      Double totalWarrantyFactor = 1 + warrantyYears * yearWarrantyFactor;
      subtotal *= totalWarrantyFactor;
    }
    productDetail.setPriceWithoutTaxes(subtotal);
  }

  private void completeDetailSubtotal(
          OrderDetail orderDetail
    )
  {
    completeDetailTaxFields(orderDetail);
    Double subtotal = orderDetail.getPriceWithoutTaxes();
    Double taxCharges = orderDetail.getTaxCharges() / 100.0;
    subtotal *= ( 1 + taxCharges );
    orderDetail.setSubTotal(subtotal);
  }

  private void completeDetailTaxFields(
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
  }

  private void setOrderDiscountService(Order order)
  {
    List<ServiceDetail> serviceDetails = order.getServices();
    ServiceEntity discountService = null;
    if( serviceDetails != null && ! serviceDetails.isEmpty())
      discountService = order.getServices().get(0).getService();
    else
      ;/* discountService = clientService.getDiscountService(client);*/
    order.setDiscountService(discountService);
  }

  private Double getDiscountFactor(Order order)
  {
    if(order.getDiscountService() != null)
      return appConstants.getDiscountFactor();
    return 0.0;
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
}
