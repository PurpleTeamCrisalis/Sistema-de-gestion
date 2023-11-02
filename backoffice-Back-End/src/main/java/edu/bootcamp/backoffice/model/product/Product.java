package edu.bootcamp.backoffice.model.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "productTable")
@NoArgsConstructor
public class Product extends Asset {
    	@Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

    @ManyToMany
    @JoinTable(
            name = "taxesByProducts",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "tax_id")
    )
    public Set<Tax> taxes;
}

