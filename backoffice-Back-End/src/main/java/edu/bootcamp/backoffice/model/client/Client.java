package edu.bootcamp.backoffice.model.client;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.order.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client")
@Builder
public class Client {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<Order> orders = new ArrayList<>();
}

// package edu.bootcamp.backoffice.model.client;

// import edu.bootcamp.backoffice.model.EntitiesConstraints;
// import edu.bootcamp.backoffice.model.SoftDeletable;
// import edu.bootcamp.backoffice.model.order.Order;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// import javax.persistence.*;
// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;

// @Data
// @Entity
// @NoArgsConstructor
// @AllArgsConstructor
// @Table(name = "clientTable")
// @Builder
// public class Client implements SoftDeletable {
// @Id
// @Column(name = "clientId")
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Integer id;

// @Column(name = "clientName", nullable = false, length =
// EntitiesConstraints.CLIENTNAME_MAX_LENGTH)
// private String clientName;

// @Column(name = "clientLastName", nullable = false, length =
// EntitiesConstraints.CLIENTNAME_MAX_LENGTH)
// private String clientLastName;

// @Column(name = "clientDNI", nullable = false)
// private Integer clientDNI;

// @Column(name = "clientBussinessName", nullable = false, length =
// EntitiesConstraints.CLIENTBUSSINESSNAME_MAX_LENGTH)
// private String clientBussinessName;

// @Column(name = "clientStartDate", nullable = false)
// private Date clientStartDate;

// @Column(name = "clientCUIT", nullable = false)
// private long clientCUIT;

// @Column(name = "clientPhone", nullable = false)
// private long clientPhone;

// @Column(name = "clientAdress", nullable = false, length =
// EntitiesConstraints.CLIENTADRESS_MAX_LENGTH)
// private String clientAdress;

// @Column(name = "enabled", nullable = false)
// private boolean enabled = true;

// @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
// private List<Order> clientOrders = new ArrayList<>();

// public Boolean isDeleted() {
// return !enabled;
// }

// public Boolean isNotDeleted() {
// return enabled;
// }...(1

// line left
// )