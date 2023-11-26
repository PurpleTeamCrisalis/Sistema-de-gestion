package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.ticketOrdersHistory.dto.TicketResponse;
import edu.bootcamp.backoffice.service.Interface.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/ticket")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @Transactional
    @GetMapping(
            path = "/ordersHistory",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<TicketResponse>> getOrdersHistory() {
        List<TicketResponse> tickets = ticketService.get();
        return ResponseEntity.ok(tickets);
    }

}
