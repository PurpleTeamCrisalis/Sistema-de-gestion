package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.ticket.ServiceForMaxDiscountPerClientDto;
import edu.bootcamp.backoffice.model.ticket.TicketForOrdersHistoryDto;
import edu.bootcamp.backoffice.service.Interface.ServiceForMaxDiscountPerClientService;
import edu.bootcamp.backoffice.service.Interface.TicketForOrdersHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "ticket")
public class TicketController
{
    @Autowired
    private final ServiceForMaxDiscountPerClientService serviceForMaxDiscountPerClientService;

    private final TicketForOrdersHistory ticketService;

    public TicketController(
            ServiceForMaxDiscountPerClientService serviceForMaxDiscountPerClientService,
            TicketForOrdersHistory ticketService)
    {
        this.serviceForMaxDiscountPerClientService = serviceForMaxDiscountPerClientService;
        this.ticketService = ticketService;
    }

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ServiceForMaxDiscountPerClientDto>> GetServiceForMaxDiscountPerClient(
            @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        List<ServiceForMaxDiscountPerClientDto> result = serviceForMaxDiscountPerClientService
                .getServiceForMaxDiscountPerClient(startDate, endDate);
        return ResponseEntity.ok(result);
    }

    @Transactional
    @GetMapping(
            path = "/orders-history",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<TicketForOrdersHistoryDto>> getOrdersHistory() {
        List<TicketForOrdersHistoryDto> tickets = ticketService.getOrdersHistory();
        return ResponseEntity.ok(tickets);
    }
}
