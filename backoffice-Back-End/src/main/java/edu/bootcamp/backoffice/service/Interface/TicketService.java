package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.ticketOrdersHistory.dto.TicketResponse;

import java.util.List;

public interface TicketService {

    public List<TicketResponse> get()
            throws InvalidIdFormatException;

}
