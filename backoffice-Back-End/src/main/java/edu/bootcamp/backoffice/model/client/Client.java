package edu.bootcamp.backoffice.model.client;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.order.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client implements SoftDeletable {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "enabled")
  private boolean enabled;

  @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
  private List<Order> clientOrders = new ArrayList<>();

  public Boolean isDeleted() {
    return !enabled;
  }

  public Boolean isNotDeleted() {
    return enabled;
  }
}