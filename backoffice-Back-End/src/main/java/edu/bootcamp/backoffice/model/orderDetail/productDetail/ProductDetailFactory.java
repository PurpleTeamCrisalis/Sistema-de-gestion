package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.order.Order;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.product.Product;

@Component
public class ProductDetailFactory {

  public ProductDetail CreateEntity(
    ProductDetailRequest productDetailDTO,
    Product product,
    Order order
  ) {
    ProductDetail productDetail = ProductDetail
      .builder()
      .product(product)
      .order(order)
      .order(order)
      .quantity(productDetailDTO.getQuantity())
      .warranty(productDetailDTO.getWarranty())
      // .taxCharges(product.getTaxCharges())
      // .taxesApplied(product.getTaxesApplied())
      .subTotal(0.00)
      .build();
    return productDetail;
  }

  public ProductDetailResponse createResponse(
    ProductDetail productDetail
  ) {
    return ProductDetailResponse 
    .builder()
    .id(productDetail.getId())
    .productId(productDetail.getProduct().getId())
    .quantity(productDetail.getQuantity())
    .subTotal(productDetail.getSubTotal())
    //.taxCharges(productDetail.getTaxCharges())
    //.taxesApplied(productDetail.getTaxesApplied())
    .name(productDetail.getProduct().getName())
    .basePrice(productDetail.getPriceWithoutTaxes())
    .build();
  }
}
