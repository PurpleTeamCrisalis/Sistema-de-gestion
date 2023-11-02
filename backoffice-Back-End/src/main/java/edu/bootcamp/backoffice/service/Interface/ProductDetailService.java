package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;

public interface ProductDetailService {
  public void registerProductDetail (
    List<ProductDetail> createProductRequests,
    Order order 
  );
  public List<ProductDetail> getProductsDetails (
    List<ProductDetailRequest> orderProductRequests
  );
}
