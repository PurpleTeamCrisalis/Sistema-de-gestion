package edu.bootcamp.backoffice.model.serviceEntity;

import javax.persistence.*;

import java.util.List;
import java.util.ArrayList;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.serviceDetail.ServiceDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service")
@Builder
public class ServiceEntity {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToMany(mappedBy = "discountService", fetch = FetchType.LAZY)
  private List<Order> ordersWithDiscount = new ArrayList<>();

  @OneToMany(mappedBy = "service", fetch = FetchType.LAZY)
  private List<ServiceDetail> serviceDetails = new ArrayList<>();
}
