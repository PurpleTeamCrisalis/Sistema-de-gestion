package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.bootcamp.backoffice.config.AppConstants;
import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.taxByOrder.TaxByOrder;
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
    clientService.createSubscriptionsAndMergeWithClient(
            order.getClient(),
            order.getServices()
    );
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
    Map<Integer, TaxByOrder> taxesByOrder = new HashMap<>();
    double totalWithoutDiscount = completeServicesSubtotal(
            order.getServices(),
            taxesByOrder
    );
    double productsSubtotal = completeProductsSubtotal(
            order.getProducts(),
            taxesByOrder
    );
    completeOrderDiscount(order, productsSubtotal);
    totalWithoutDiscount += productsSubtotal - order.getTotalDiscount();
    order.setTotal(totalWithoutDiscount);
    List<TaxByOrder> taxChargesList = new ArrayList<>(taxesByOrder.values());
    for (TaxByOrder taxByOrder : taxChargesList)
      taxByOrder.setOrder(order);
    order.setTaxesByOrder(taxChargesList);
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
          List<ServiceDetail> services,
          Map<Integer, TaxByOrder> taxesByOrder
    )
  {
    double total = 0.0;
    for(ServiceDetail serviceDetail : services)
    {
      setServiceGrossPrice(serviceDetail);
      applyTaxes(serviceDetail, taxesByOrder, 1);
      total += serviceDetail.getSubTotal();
    }
    return total;
  }

  private Double completeProductsSubtotal(
          List<ProductDetail> productDetails,
          Map<Integer, TaxByOrder> taxesByOrder
    )
  {
    double total = 0.0;
    for(ProductDetail productDetail : productDetails)
    {
      setProductGrossPrice(productDetail);
      applyTaxes(
              productDetail,
              taxesByOrder,
              productDetail.getQuantity()
      );
      total += productDetail.getSubTotal();;
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

  private void setServiceGrossPrice(
          ServiceDetail serviceDetail
    )
  {
    ServiceEntity service = serviceDetail.getService();
    double subtotal = service.getBasePrice();
    if(service.isSpecial())
      subtotal += service.getSuportCharge();
    serviceDetail.setPriceWithoutTaxes(subtotal);
  }

  private void setProductGrossPrice(
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

  private void applyTaxes(
          OrderDetail orderDetail,
          Map<Integer, TaxByOrder> taxesByOrder,
          int quantity
    )
  {
    double subtotal = orderDetail.getPriceWithoutTaxes() * quantity;
    for (Tax tax : orderDetail.getAsset().getAllTaxes())
    {
      double tax_factor = tax.getPercentage() / 100.0;
      double charge = orderDetail.getPriceWithoutTaxes() * tax_factor* quantity;
      addTaxAmount(taxesByOrder, charge , tax);
      subtotal += charge;
    }
    orderDetail.setSubTotal(subtotal);
  }

  private void addTaxAmount(
    Map<Integer, TaxByOrder> taxesByOrder,
    double amount,
    Tax tax
  ){
    if (taxesByOrder.containsKey(tax.getId())) {
      TaxByOrder existingTaxByOrder = taxesByOrder.get(tax.getId());
      double updatedAmount = existingTaxByOrder.getAmount() + amount;
      existingTaxByOrder.setAmount(updatedAmount);
    } else {
      TaxByOrder newTaxByOrder = new TaxByOrder();
      newTaxByOrder.setTax(tax);
      newTaxByOrder.setAmount(amount);
      taxesByOrder.put(tax.getId(), newTaxByOrder);
    }
  }

  private void setOrderDiscountService(Order order)
  {
    List<ServiceDetail> serviceDetails = order.getServices();
    ServiceEntity discountService = null;
    if( serviceDetails != null && ! serviceDetails.isEmpty())
      discountService = order.getServices().get(0).getService();
    else
       discountService = clientService.getDiscountService(order.getClient());
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
    orderRepository.save(order);
    return orderFactory.createOrderResponse(order);
  }

  public List<OrderResponse> getClientOrders(int clientId) {
    List<Order> orders = orderRepository.findAll();
    List<OrderResponse> dtos = new ArrayList<OrderResponse>();

    for (Order order : orders) {
        if (order.getClient().getId() != clientId) continue;
        dtos.add(orderFactory.createOrderResponse(order));
    }

    return dtos;
}
}
