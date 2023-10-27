package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.product.Product;

@Component
public class ProductDetailFactory {

  public ProductDetail CreateProductDetailEntity(
    ProductDetailRequest productDetailDTO,
    Product product,
    Order order
  ) {
    return ProductDetail
        .builder()
        .product(product)
        .order(order)
        .quantity(productDetailDTO.getQuantity())
        .warranty(productDetailDTO.getWarranty())
        .build();
  }
}
