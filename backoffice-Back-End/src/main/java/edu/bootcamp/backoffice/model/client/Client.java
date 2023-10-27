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
@Builder
public class Client implements SoftDeletable {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "clientName", nullable = false, length = EntitiesConstraints.CLIENTNAME_MAX_LENGTH)
  private String name;

  @Column(name = "clientLastName", nullable = false, length = EntitiesConstraints.CLIENTNAME_MAX_LENGTH)
  private String lastName;

  @Column(name = "clientDNI", nullable = false)
  private Integer dni;

  @Column(name = "clientPhone", nullable = false)
  private Long phone;

  @Column(name = "clientAdress", nullable = false, length = EntitiesConstraints.CLIENTADRESS_MAX_LENGTH)
  private String adress;

  @Column(name = "isBussiness", nullable = false, length = 1)
  private Boolean isBussiness;

  @Column(name = "clientBussinessName", length = EntitiesConstraints.CLIENTBUSSINESSNAME_MAX_LENGTH)
  private String bussinessName;

  @Column(name = "clientStartDate")
  private Date startDate;

  @Column(name = "clientCUIT")
  private Long cuit;

  @Column(name = "enabled")
  private boolean enabled = true;

  @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
  private List<Order> clientOrders = new ArrayList<>();

  public Boolean isDeleted() {
    return !enabled;
  }

  public Boolean isNotDeleted() {
    return enabled;
  }
}