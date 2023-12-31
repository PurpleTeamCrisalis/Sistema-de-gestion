package edu.bootcamp.backoffice.model.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.asset.Asset;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "taxesByProducts",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "tax_id")
    )
    private List<Tax> taxes;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductDetail> productDetails = new ArrayList<>();

    @Override
    public List<Tax> getAllTaxes() {
        return taxes;
    }
}
