package edu.bootcamp.backoffice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
  public Optional<List<ProductDetail>> findAllByOrderId (Integer orderId);
}
