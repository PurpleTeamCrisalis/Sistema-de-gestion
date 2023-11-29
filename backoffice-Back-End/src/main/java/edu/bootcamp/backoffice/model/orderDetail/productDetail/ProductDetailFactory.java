package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.order.Order;

import java.util.List;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.product.Product;

@Component
public class ProductDetailFactory {

  public ProductDetail CreateEntity(
      ProductDetailRequest productDetailDTO,
      Product product,
      Order order) {
    ProductDetail productDetail = ProductDetail
        .builder()
        .product(product)
        .order(order)
        .quantity(productDetailDTO.getQuantity())
        .warranty(productDetailDTO.getWarranty())
        .taxesApplied(getTaxesApplied(product.getAllTaxes()))
        .subTotal(0.00)
        .build();
    return productDetail;
  }

  public ProductDetailResponse createResponse(
      ProductDetail productDetail) {
    return ProductDetailResponse
        .builder()
        .id(productDetail.getId())
        .productId(productDetail.getProduct().getId())
        .quantity(productDetail.getQuantity())
        .subTotal(productDetail.getSubTotal())
        .taxesApplied(productDetail.getTaxesApplied())
        .name(productDetail.getProduct().getName())
        .basePrice(productDetail.getPriceWithoutTaxes())
        .build();
  }

  private String getTaxesApplied(List<Tax> taxes) {
    String taxesStr = "";
    for (Tax tax : taxes) {
      taxesStr += tax.getName() + " ";
    }
    return taxesStr;
  }
}
