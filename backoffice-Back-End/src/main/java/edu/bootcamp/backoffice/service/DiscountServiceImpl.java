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
import edu.bootcamp.backoffice.repository.DiscountServiceReposity;

@Service
public class DiscountServiceImpl {

    private final DiscountServiceReposity repository;

    @Autowired
    public DiscountServiceImpl(DiscountServiceReposity repository) {
        this.repository = repository;
    }

    @Transactional
    public List<DiscountServiceDto> getTotalDiscountServices() {
        List<Object[]> result = repository.getTotalDiscountServices();
        System.out.println(result);
        return mapToObject(result);
    }

    private List<DiscountServiceDto> mapToObject(List<Object[]> result){
        List<DiscountServiceDto> dtos = new ArrayList<>();

        for (Object[] row : result) {
            DiscountServiceDto dto = new DiscountServiceDto();
            dto.setClientName   ((String) row[0]);
            dto.setServicename  ((String) row[1]);
            dto.setOrderDate    ((Date) row[2]);
            dto.setTotalDiscount((Double) row[3]);
            dtos.add(dto);
        }

        return dtos;
    }
}
