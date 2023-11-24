package edu.bootcamp.backoffice.model.orderDetail.OrderDetail;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.order.Order;
import lombok.AllArgsConstructor;
import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
// @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
// @DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public abstract class OrderDetail
{
    @Column(
            name = "taxesApplied", nullable = false,
            length = EntitiesConstraints.TAXES_APPLIED_MAX_LENGTH
    )
    private String taxesApplied;

    @Column(name = "taxCharges", nullable = false)
    private Double taxCharges;

    @Column(name = "subTotal", nullable = false)
    private Double subTotal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "basePrice", nullable = false)
    private double priceWithoutTaxes;

    public abstract Asset getAsset();
}
