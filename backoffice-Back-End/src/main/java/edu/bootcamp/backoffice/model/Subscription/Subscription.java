package edu.bootcamp.backoffice.model.Subscription;

import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subscription")
@Builder
public class Subscription implements SoftDeletable {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private ServiceEntity service;

    @Column(name = "isEnabled", nullable = false)
    private boolean enabled;

    public Boolean isDeleted() {
        return !enabled;
    }

    public Boolean isNotDeleted() {
        return enabled;
    }
}
