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
            dto.setClientLastName((String) row[2]);
            dto.setIsBussiness((Boolean) row[3]);
            dto.setBussinessName((String) row[4]);
            dto.setOrderId((Integer) row[5]);
            dto.setOrderState((String) row[6]);
            dto.setOrderDate((Date) row[7]);
            dto.setProductServiceName((String) row[8]);
            dto.setProductServiceQuantity((Integer) row[9]);
            dto.setBasePrice((Double) row[10]);
            dto.setSubTotal((Double) row[11]);
            dto.setTaxesTotalPrice((Double) row[12]);
            dto.setTotalDiscount((Double) row[13]);
            dto.setTotalPrice((Double) row[14]);
            dtos.add(dto);
        }

        return dtos;
    }

}
