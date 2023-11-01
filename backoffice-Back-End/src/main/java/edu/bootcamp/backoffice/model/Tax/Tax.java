package edu.bootcamp.backoffice.model.Tax;

import java.util.Set;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Tax") //Nombre de la tabla
@Builder

public class Tax implements SoftDeletable{
    //Creamos la id
    @Id
    @Column(name="tax_id")
    @GeneratedValue(//Hacemos que sea autoincrementable
        strategy = GenerationType.IDENTITY
    )
    private Integer id;

    //Creamos columnas
    @Column(
        name = "name",
        length = EntitiesConstraints.CHARGENAME_MAX_LENGTH,
        nullable = false
    )
    private String name;

    @Column(
        name = "percentage",
        length = EntitiesConstraints.CHARGEPERCENTAGE_MAX_LENGTH,
        nullable = false
    )
    private Integer percentage;

    @Column(
        name = "enabled",
        nullable = false
    )
    private boolean enabled = true;

    //@Override
    public Boolean isDeleted() {
        return !enabled;
    }

    public Boolean isNotDeleted() {
        return enabled;
    }

    @ManyToMany(mappedBy = "taxes")
    Set<Product> products;

    @ManyToMany(mappedBy = "taxes")
    Set<ServiceEntity> serviceEntities;
}
