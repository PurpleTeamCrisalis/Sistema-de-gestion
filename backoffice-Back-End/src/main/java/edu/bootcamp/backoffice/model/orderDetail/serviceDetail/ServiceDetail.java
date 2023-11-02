package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "serviceDetail")
@Builder
public class ServiceDetail // extends OrderDetail
{
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(
    name = "taxesApplied", nullable = false, 
    length = EntitiesConstraints.TAXES_APPLIED_MAX_LENGTH
  )
  private String taxesApplied;

  @Column(name = "taxCharges", nullable = false)
  private Double taxCharges;

  @Column(name = "subTotal", nullable = false)
  private Double subTotal;

  @ManyToOne
  private Order order;

  @ManyToOne
  private ServiceEntity service;

  public void calculateSubtotal() {
    subTotal = service.getBasePrice();
  }
}
