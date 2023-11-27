package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.ticket.ServiceForMaxDiscountPerClientDto;
import edu.bootcamp.backoffice.service.Interface.ServiceForMaxDiscountPerClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "ticket")
public class TicketController
{
    @Autowired
    private final ServiceForMaxDiscountPerClientService serviceForMaxDiscountPerClientService;

    public TicketController(
            ServiceForMaxDiscountPerClientService serviceForMaxDiscountPerClientService
        )
    {
        this.serviceForMaxDiscountPerClientService = serviceForMaxDiscountPerClientService;
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
}
