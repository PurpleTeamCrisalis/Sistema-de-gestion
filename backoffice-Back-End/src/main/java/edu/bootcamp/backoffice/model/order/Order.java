package edu.bootcamp.backoffice.model.order;

import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.taxByOrder.TaxByOrder;
import edu.bootcamp.backoffice.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderTable")
@Builder
public class Order implements SoftDeletable{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // OrderState -> Patron State
    // @Column(name = "orderState", nullable = false)
    // private OrderState orderState;

    @Column(
            name = "date",
            nullable = false,
            updatable = false
        )
    private Date date;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "totalDiscount", nullable = false)
    private Double totalDiscount;

    @Column(name="enabled", nullable = false)
    private boolean enabled;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    // Client
    @ManyToOne
    @JoinColumn(nullable = false)
    private Client client;

    // discountServiceId
    @ManyToOne
    private ServiceEntity discountService;

    // ProductDetail
    @OneToMany(
            mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
        )
    private List<ProductDetail> products = new ArrayList<>();

    // ServiceDetail
    @OneToMany(
            mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
        )
    private List<ServiceDetail> services = new ArrayList<>();

    @OneToMany(
            mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<TaxByOrder> taxesByOrder = new ArrayList<>();

    public void getFormattedDate() {/*
        Calendar calendar = Calendar.getInstance();
        Date fecha = calendar.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        date = sdf.format(fecha);*/
        date = new Date();
    }

    public Boolean isDeleted() {
        return !enabled;
    }

    public Boolean isNotDeleted() {
        return enabled;
    }
}