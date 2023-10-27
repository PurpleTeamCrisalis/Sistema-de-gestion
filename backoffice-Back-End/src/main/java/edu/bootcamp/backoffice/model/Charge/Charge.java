package edu.bootcamp.backoffice.model.Charge;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.SoftDeletable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chargeTable") //Nombre de la tabla
@Builder

public class Charge implements SoftDeletable{
    //Creamos la id
    @Id
    @Column(name="id")
    @GeneratedValue(//Hacemos que sea autoincrementable
        strategy = GenerationType.IDENTITY
    )
    private Integer id;

    //Creamos columnas
    @Column(
        name = "chargename",
        nullable = false
    )
    private String chargeName;

    @Column(
        name = "chargepercentage",
        nullable = false
    )
    private Integer chargePercentage;

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
}
