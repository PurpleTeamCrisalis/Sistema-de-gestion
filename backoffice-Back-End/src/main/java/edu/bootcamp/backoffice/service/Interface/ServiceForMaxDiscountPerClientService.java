package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.ticket.ServiceForMaxDiscountPerClientDto;

import java.util.Date;
import java.util.List;

public interface ServiceForMaxDiscountPerClientService {
    public List<ServiceForMaxDiscountPerClientDto> getServiceForMaxDiscountPerClient(
            Date startDate,
            Date endDate
    );
}
