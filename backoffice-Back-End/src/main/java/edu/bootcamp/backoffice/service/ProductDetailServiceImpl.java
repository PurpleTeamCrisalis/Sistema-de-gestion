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

@Service
public class ProductDetailServiceImpl implements ProductDetailService{

  private final ProductDetailRepository productDetailRepository;
  private final ProductDetailFactory productDetailFactory;

  public ProductDetailServiceImpl(
      ProductDetailRepository productDetailRepository,
      ProductDetailFactory productDetailFactory
  ) {
    this.productDetailRepository = productDetailRepository;
    this.productDetailFactory = productDetailFactory;

  }

  public void registerProductDetail(
    List<ProductDetail> createProductRequest,
    Order order
  ) {
    for (ProductDetail productDetail : createProductRequest) {
      // Guardo productDetail en la BD (tabla product_detail)
      productDetail.setOrder(order);
      productDetailRepository.save(productDetail);
    }
  }

  public List<ProductDetail> getProductsDetails(
    List<ProductDetailRequest> orderProductRequests
  ) {
    // Creo la lista de products donde almaceno los ProductDetail
    List<ProductDetail> products = new ArrayList<ProductDetail>();
    for (ProductDetailRequest productDetailRequest : orderProductRequests) {
      // Valido que exista product
      Product product = new Product(); // productService.get(productDetailRequest.getId())
      product.setId(productDetailRequest.getProductId());
      product.setBasePrice(100.00);
      // Creo la entidad productDetail
      ProductDetail productDetail = productDetailFactory.CreateEntity(productDetailRequest, product);
      // Agrego productDetail a lista products
      products.add(productDetail);
    }
    // Retorno la lista de ProductDetail
    return products;
  }
}
