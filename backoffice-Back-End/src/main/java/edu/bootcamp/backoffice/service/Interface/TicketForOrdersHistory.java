package edu.bootcamp.backoffice.service.Interface;


import edu.bootcamp.backoffice.model.ticket.TicketForOrdersHistoryDto;

import java.util.List;

public interface TicketForOrdersHistory {

    public List<TicketForOrdersHistoryDto> getOrdersHistory();

}
