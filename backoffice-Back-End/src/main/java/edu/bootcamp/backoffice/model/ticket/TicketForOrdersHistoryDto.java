package edu.bootcamp.backoffice.model.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigInteger;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketForOrdersHistoryDto {

    @JsonProperty("ticket_id")
    private BigInteger ticketId;

    @JsonProperty ("client_name")
    private String clientName;

    @JsonProperty ("client_bussiness_name")
    private String clientBussinessName;

    @JsonProperty ("order_id")
    private Integer orderId;

    @JsonProperty ("order_state")
    private String orderState;

    @JsonProperty ("order_date")
    private Date orderDate;

    @JsonProperty ("product_service_name")
    private String productServiceName;

    @JsonProperty ("product_service_quantity")
    private Integer productServiceQuantity;

    @JsonProperty ("base_price")
    private Double basePrice;

    @JsonProperty ("sub_total")
    private Double subTotal;

    @JsonProperty ("taxes_total_price")
    private Double taxesTotalPrice;

    @JsonProperty ("total_discount")
    private Double totalDiscount;

    @JsonProperty ("total_price")
    private Double totalPrice;

}
