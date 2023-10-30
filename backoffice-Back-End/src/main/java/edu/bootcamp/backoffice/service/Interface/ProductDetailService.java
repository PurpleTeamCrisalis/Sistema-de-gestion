package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;

public interface ProductDetailService {
  public List<ProductDetailResponse> registerProductDetail (
    List<ProductDetail> createProductRequests 
  );
  public List<ProductDetail> getProductsDetails (
    List<ProductDetailRequest> orderProductRequests
  );
  public List<ProductDetailResponse> getProductsDetailsByOrder(
    Integer orderId
  );
}
