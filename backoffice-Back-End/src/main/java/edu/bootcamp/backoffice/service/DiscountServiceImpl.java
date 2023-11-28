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
    public List<DiscountServiceDto> getOrderDiscountServices() {
        List<Object[]> result = repository.getOrderDiscountServices();
        System.out.println(result);
        return mapToObject(result);
    }

    private List<DiscountServiceDto> mapToObject(List<Object[]> result){
        List<DiscountServiceDto> dtos = new ArrayList<>();

        for (Object[] row : result) {
            DiscountServiceDto dto = new DiscountServiceDto();
            dto.setClientId((Integer) row[0]);
            dto.setClientName   ((String) row[1]);
            dto.setLastName((String) row[2]);
            dto.setDni((Integer) row[3]);
            dto.setPhone(((BigInteger) row[4]).longValueExact());
            dto.setAdress((String) row[5]);
            // dto.setStartDate((Date) row[6]);
            // dto.setClientEnabled((Boolean) row[7]);
            // dto.setIsBussiness((Boolean) row[8]);
            dto.setBussinessName((String) row[6]);
            // dto.setCuit(((BigInteger) row[7]).longValueExact());
            dto.setServiceId((Integer) row[7]);
            dto.setServiceName((String) row[8]);
            dto.setDescription((String) row[9]);
            dto.setBasePrice((Double) row[10]);
            dto.setIsSpecial(row[12] != null ? (Boolean) row[11] : false);
            dto.setSuportCharge((Double) row[12]);
            dto.setServiceEnabled((Boolean) row[13]);
            dto.setOrderDate((Date) row[14]);
            dto.setTotalDiscount((Double) row[15]);
            dtos.add(dto);
        }

        return dtos;
    }
}
