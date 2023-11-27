package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.ticket.TicketForOrdersHistoryDto;
import edu.bootcamp.backoffice.repository.TicketOrdersHistoryRepository;
import edu.bootcamp.backoffice.service.Interface.TicketForOrdersHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TicketForOrdersHistoryImpl implements TicketForOrdersHistory {

    private final TicketOrdersHistoryRepository repository;

    @Autowired
    public TicketForOrdersHistoryImpl(
            TicketOrdersHistoryRepository repository
    ){
        this.repository = repository;
    }

    @Transactional
    public List<TicketForOrdersHistoryDto> getOrdersHistory()
    {
        List<Object[]> result = repository.ordersHistory();
        return mapToObject(result);
    }

    private List<TicketForOrdersHistoryDto> mapToObject(List<Object[]> result) {
        List<TicketForOrdersHistoryDto> dtos = new ArrayList<>();

        for (Object[] row : result) {
            TicketForOrdersHistoryDto dto = new TicketForOrdersHistoryDto();
            dto.setTicketId((BigInteger) row[0]);
            dto.setClientName((String) row[1]);
            dto.setClientBussinessName((String) row[2]);
            dto.setOrderId((Integer) row[3]);
            dto.setOrderState((String) row[4]);
            dto.setOrderDate((Date) row[5]);
            dto.setProductServiceName((String) row[6]);
            dto.setProductServiceQuantity((Integer) row[7]);
            dto.setBasePrice((Double) row[8]);
            dto.setSubTotal((Double) row[9]);
            dto.setTaxesTotalPrice((Double) row[10]);
            dto.setTotalDiscount((Double) row[11]);
            dto.setTotalPrice((Double) row[12]);
            dtos.add(dto);
        }

        return dtos;
    }

}
