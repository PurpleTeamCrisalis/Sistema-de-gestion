package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.asset.Asset;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productDetail")
@SuperBuilder
public class ProductDetail extends OrderDetail
{
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "quantity", nullable = false)
  private Integer quantity;
  
  @Column(name = "warranty")
  private Double warranty;

  @ManyToOne(optional = false)
  private Product product;

  @Override
  public Asset getAsset() {
    return product;
  }
}
