package edu.bootcamp.backoffice.model.ticketOrdersHistory.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TicketResponse {

    @JsonProperty ("ticket_id")
    private Integer ticketId;

    @JsonProperty ("client_name")
    private String clientName;

    @JsonProperty ("client_bussiness_name")
    private String clientBussinessName;

    @JsonProperty ("order_id")
    private Integer orderId;

    @JsonProperty ("order_status")
    private Boolean orderStatus;

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

    @JsonProperty ("total_price")
    private Double totalPrice;
}
