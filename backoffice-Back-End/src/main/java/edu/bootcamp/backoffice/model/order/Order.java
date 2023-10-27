package edu.bootcamp.backoffice.model.order;

import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.ProductDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;
import edu.bootcamp.backoffice.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderTable")
@Builder
public class Order {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // OrderState -> Patron State
    // @Column(name = "orderState", nullable = false)
    // private OrderState orderState;

    @Column(name = "date", nullable = false, updatable = false)
    private Date date;

    // Total
    @Column(name = "total", nullable = false)
    private Float total;

    @ManyToOne
    private User user;

    // Client
    @ManyToOne
    private Client client;

    // discountServiceId
    @ManyToOne
    private ServiceEntity discountServiceEntity;

    // ProductDetail
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<ProductDetail> products = new ArrayList<>();

    // ServiceDetail
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<ServiceDetail> services = new ArrayList<>();
}
