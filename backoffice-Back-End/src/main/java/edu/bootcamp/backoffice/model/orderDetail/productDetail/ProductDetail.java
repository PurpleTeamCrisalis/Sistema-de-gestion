package edu.bootcamp.backoffice.model.orderDetail.productDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.order.Order;
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
@Builder
public class ProductDetail // extends OrderDetail
{
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(
    name = "taxesApplied", 
    nullable = false, 
    length = EntitiesConstraints.TAXES_APPLIED_MAX_LENGTH
  )
  private String taxesApplied;

  @Column(name = "taxCharges", nullable = false)
  private Double taxCharges;

  @Column(name = "subTotal", nullable = false)
  private Double subTotal;
  
  @Column(name = "quantity")
  private Integer quantity;
  
  @Column(name = "warranty")
  private Double warranty;

  @ManyToOne
  private Order order;

  @ManyToOne
  private Product product;

  public void calculateSubtotal() {
    subTotal = (product.getBasePrice() * quantity);
  }
}
