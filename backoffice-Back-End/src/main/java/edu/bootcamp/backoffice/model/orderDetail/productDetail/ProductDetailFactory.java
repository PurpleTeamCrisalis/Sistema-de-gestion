package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;

@Component
public class ProductDetailFactory {

  public ProductDetail CreateProductDetailEntity(ProductDetailRequest productDetailDTO) {

    return ProductDetail
        .builder()
        // .subTotal()
        .quantity(productDetailDTO.getQuantity())
        .warranty(productDetailDTO.getWarranty())
        .build();
  }
}
