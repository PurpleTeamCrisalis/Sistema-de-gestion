package edu.bootcamp.backoffice.model.order;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="orderTable")
@Builder
public class Order {

    @Id
    @Column(name="orderId")
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    @ManyToOne
    //@JoinColumn(name = "employee_id")
    private User user;

    @ManyToOne
    //@JoinColumn(name = "employee_id")
    private Client client;
}
