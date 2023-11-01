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
@Table(name = "clientTable")
@Builder
public class Client implements SoftDeletable {
    @Id
    @Column(name = "id")
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    @Column(
            name = "name",
            nullable = false,
            length = EntitiesConstraints.CLIENTNAME_MAX_LENGTH
    )
    private String name;

    @Column(
            name = "lastName",
            nullable = false,
            length = EntitiesConstraints.CLIENTNAME_MAX_LENGTH
    )
    private String lastName;

    @Column(
            name = "dni",
            nullable = false
    )
    private Integer dni;

    @Column(
            name = "phone",
            nullable = false
    )
    private Long phone;

    @Column(
            name = "adress",
            nullable = false,
            length = EntitiesConstraints.CLIENTADDRESS_MAX_LENGTH
    )
    private String adress;

    @Column(
            name = "isBussiness",
            nullable = false,
            length = 1
    )
    private Boolean isBussiness;

    @Column(
            name = "bussinessName",
            length = EntitiesConstraints.CLIENT_BUSSINESSNAME_MAX_LENGTH
    )
    private String bussinessName;

    @Column(
            name = "startDate"
    )
    private Date startDate;

    @Column(
            name = "cuit"
    )
    private Long cuit;

    @Column(
            name="enabled",
            nullable = false
    )
    private boolean enabled = true;

    @OneToMany(
            mappedBy = "client",
            fetch = FetchType.LAZY
    )
    private List<Order> clientOrders = new ArrayList<>();

    public Boolean isDeleted() {
        return !enabled;
    }

    public Boolean isNotDeleted() {
        return enabled;
    }
}
