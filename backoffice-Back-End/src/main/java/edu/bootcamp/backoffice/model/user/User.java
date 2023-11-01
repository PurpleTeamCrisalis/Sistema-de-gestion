package edu.bootcamp.backoffice.model.user;

import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.order.Order;
import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userTable")
@Builder
public class User implements SoftDeletable
{
    @Id
    @Column(name = "id")
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    @Column(
            name = "username",
            nullable = false,
            length = EntitiesConstraints.USERNAME_MAX_LENGTH
    )
    private String username;

    @Column(
            name = "password",
            nullable = false,
            length = EntitiesConstraints.PASSWORD_MAX_LENGTH
    )
    private String password;

    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @Column(
            name="enabled",
            nullable = false
    )
    private boolean enabled = true;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY
    )
    private List<Order> processedOrders = new ArrayList<>();

    //@Override
    public Boolean isDeleted() {
        return !enabled;
    }

    public Boolean isNotDeleted() {
        return enabled;
    }
}
