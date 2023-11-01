package edu.bootcamp.backoffice.model.product;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "productTable")

public class Product extends Asset {
    	@Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        //Descomentar cuando esté la clase taxs
        // @OneToMany(mappedBy = "asset")
        // private List<Taxs> taxs = new ArrayList<>();
}
