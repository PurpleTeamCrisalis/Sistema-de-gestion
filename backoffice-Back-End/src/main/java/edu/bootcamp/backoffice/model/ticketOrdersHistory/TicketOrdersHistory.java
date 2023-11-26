package edu.bootcamp.backoffice.model.ticketOrdersHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ordersHistoryTable")
@Builder
public class TicketOrdersHistory
{

    @Id
    @Column(name = "ticketId")
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer ticketId;

    @Column(name = "name")
    private String clientName;

    @Column(name = "bussiness_name")
    private String clientBussinessName;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "enabled")
    private Boolean orderStatus;

    @Column(name = "date")
    private Date orderDate;

    @Column(name = "product_name")
    private String productServiceName;

    @Column(name = "quantity")
    private Integer productServiceQuantity;

    @Column(name = "base_price")
    private Double basePrice;

    @Column(name = "sub_total")
    private Double subTotal;

    @Column(name = "total_impuestos")
    private Double taxesTotalPrice;

    @Column(name = "total")
    private Double totalPrice;
}
