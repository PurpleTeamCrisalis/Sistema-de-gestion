package edu.bootcamp.backoffice.model.productDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productDetail")
// @Builder -> Tira error con el OrderDetail
public class ProductDetail extends OrderDetail {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  private Order order;

  @ManyToOne
  private Product product;

  // @Column(name = "quantity")
  // private Integer quantity;

  // @Column(name = "warranty")
  // private Float warranty;

  // @OneToOne
  // private ProductEntity product;
}
