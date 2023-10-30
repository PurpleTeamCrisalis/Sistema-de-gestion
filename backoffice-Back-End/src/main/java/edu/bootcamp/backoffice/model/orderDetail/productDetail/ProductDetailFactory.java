package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.product.Product;

@Component
public class ProductDetailFactory {

  public ProductDetail CreateEntity(
    ProductDetailRequest productDetailDTO,
    Product product
  ) {
    ProductDetail productDetail = ProductDetail
      .builder()
      .product(product)
      .quantity(productDetailDTO.getQuantity())
      .warranty(productDetailDTO.getWarranty())
      // .taxCharges(product.getTaxCharges())
      // .taxesApplied(product.getTaxesApplied())
      .subTotal(0.00)
      .build();
    productDetail.calculateSubtotal();
    productDetail.setTaxCharges(10.00);
    productDetail.setTaxesApplied("IVA - Ganancias - IIBB");
    return productDetail;
  }

  public ProductDetailResponse CreateResponse(
    ProductDetail productDetail
  ) {
    return ProductDetailResponse 
    .builder()
    .id(productDetail.getId())
    .productId(productDetail.getProduct().getId())
    .quantity(productDetail.getQuantity())
    .subTotal(productDetail.getSubTotal())
    .taxCharges(productDetail.getTaxCharges())
    .taxesApplied(productDetail.getTaxesApplied())
    .build();
  }
}
