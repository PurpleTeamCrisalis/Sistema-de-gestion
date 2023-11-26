package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.ticketOrdersHistory.TicketFactory;
import edu.bootcamp.backoffice.model.ticketOrdersHistory.TicketOrdersHistory;
import edu.bootcamp.backoffice.model.ticketOrdersHistory.dto.TicketResponse;
import edu.bootcamp.backoffice.repository.OrdersHistoryRepository;
import edu.bootcamp.backoffice.service.Interface.TicketService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private final OrdersHistoryRepository repository;

    private final TicketFactory ticketFactory;

    public TicketServiceImpl(
            OrdersHistoryRepository repository,
            TicketFactory ticketFactory
    ){
        this.repository = repository;
        this.ticketFactory = ticketFactory;
    }

    public List<TicketResponse> get() {
        List<TicketOrdersHistory> tickets = repository.ordersHistory();
        List<TicketResponse> dtos = new ArrayList<>();
        for (TicketOrdersHistory ticket : tickets)
            dtos.add(ticketFactory.createResponse(ticket));
        return dtos;
    }

}
