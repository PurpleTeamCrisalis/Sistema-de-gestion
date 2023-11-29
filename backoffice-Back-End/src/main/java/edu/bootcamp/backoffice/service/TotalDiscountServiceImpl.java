package edu.bootcamp.backoffice.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.discoutService.DiscountServiceDto;
import edu.bootcamp.backoffice.model.ticket.ServiceForMaxDiscountPerClientDto;
import edu.bootcamp.backoffice.repository.TotalDiscountsService;

@Service
public class TotalDiscountServiceImpl {

    private final TotalDiscountsService repository;

    @Autowired
    public TotalDiscountServiceImpl(TotalDiscountsService repository) {
        this.repository = repository;
    }

    @Transactional
    public List<DiscountServiceDto> getTotalDiscountsService() {
        List<Object[]> result = repository.getTotalDiscountsService();
        System.out.println(result);
        return mapToObject(result);
    }

    private List<DiscountServiceDto> mapToObject(List<Object[]> result){
        List<DiscountServiceDto> dtos = new ArrayList<>();

        for (Object[] row : result) {
            DiscountServiceDto dto = new DiscountServiceDto();
            dto.setClientName    ((String) row[0]);
            dto.setClientLastName((String) row[1]);
            dto.setServicename   ((String) row[2]);
            dto.setOrderDate     ((Date) row[3]);
            dto.setTotalDiscount ((Double) row[4]);
            dtos.add(dto);
        }

        return dtos;
    }
}
