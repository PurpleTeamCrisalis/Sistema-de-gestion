package edu.bootcamp.backoffice.model.ticketOrdersHistory;

import edu.bootcamp.backoffice.model.ticketOrdersHistory.dto.TicketResponse;
import org.springframework.stereotype.Component;

@Component
public class TicketFactory {

    public TicketResponse createResponse(
            TicketOrdersHistory ticket
    ) {
        return TicketResponse
                .builder()
                .ticketId(ticket.getTicketId())
                .clientName(ticket.getClientName())
                .clientBussinessName(ticket.getClientBussinessName())
                .orderId(ticket.getOrderId())
                .orderStatus(ticket.getOrderStatus())
                .orderDate(ticket.getOrderDate())
                .productServiceName(ticket.getProductServiceName())
                .productServiceQuantity(ticket.getProductServiceQuantity())
                .basePrice(ticket.getBasePrice())
                .subTotal(ticket.getSubTotal())
                .taxesTotalPrice(ticket.getTaxesTotalPrice())
                .totalPrice(ticket.getTotalPrice())
                .build();
    }

}
