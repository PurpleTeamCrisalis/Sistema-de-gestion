package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailRequest;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.repository.ProductDetailRepository;
import edu.bootcamp.backoffice.service.Interface.ProductDetailService;
import edu.bootcamp.backoffice.service.Interface.ProductService;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

  private final ProductDetailRepository productDetailRepository;
  private final ProductDetailFactory productDetailFactory;
  private final ProductService productService;

  public ProductDetailServiceImpl(
      ProductDetailRepository productDetailRepository,
      ProductDetailFactory productDetailFactory,
      ProductService productService) {
    this.productDetailRepository = productDetailRepository;
    this.productDetailFactory = productDetailFactory;
    this.productService = productService;
  }
/*
  public void registerProductDetail(
      List<ProductDetail> createProductRequest,
      Order order) {
    for (ProductDetail productDetail : createProductRequest) {
      // Guardo productDetail en la BD (tabla product_detail)
      productDetail.setOrder(order);
      productDetailRepository.save(productDetail);
    }
  }*/

  public List<ProductDetail> getProductsDetails(
    List<ProductDetailRequest> orderProductRequests,
    StringBuilder errorBuilder,
    Order order
  ) {
    List<ProductDetail> products = new ArrayList<ProductDetail>();
    for (ProductDetailRequest productDetailRequest : orderProductRequests) {
      Product product = productService.getProductById(
              productDetailRequest.getProductId(),
              errorBuilder
              );
      if (product != null)
      {
        ProductDetail productDetail = productDetailFactory.CreateEntity(
                productDetailRequest,
                product,
                order
        );
        products.add(productDetail);
      }
    }
    return products;
  }
}
