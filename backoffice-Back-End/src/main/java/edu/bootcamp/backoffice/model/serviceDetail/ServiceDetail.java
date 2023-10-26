package edu.bootcamp.backoffice.model.serviceDetail;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.OrderDetail;
import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "serviceDetail")
// @Builder -> Tira error con el OrderDetail
public class ServiceDetail extends OrderDetail{

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  private Order order;

  @ManyToOne
  private ServiceEntity service;

}
