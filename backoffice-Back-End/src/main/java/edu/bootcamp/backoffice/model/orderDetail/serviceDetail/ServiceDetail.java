package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.asset.Asset;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "serviceDetail")
@SuperBuilder
public class ServiceDetail extends OrderDetail
{
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(optional = false)
  private ServiceEntity service;

  @Column(name = "taxesApplied")
  private String taxesApplied;

  @Override
  public Asset getAsset() {
    return service;
  }
}
