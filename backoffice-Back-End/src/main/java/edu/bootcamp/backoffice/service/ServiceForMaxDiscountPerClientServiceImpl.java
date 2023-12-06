package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.ticket.ServiceForMaxDiscountPerClientDto;
import edu.bootcamp.backoffice.repository.ServiceForMaxDiscountPerClientRepository;
import edu.bootcamp.backoffice.service.Interface.ServiceForMaxDiscountPerClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceForMaxDiscountPerClientServiceImpl
    implements ServiceForMaxDiscountPerClientService
{
    private final ServiceForMaxDiscountPerClientRepository repository;

    @Autowired
    public ServiceForMaxDiscountPerClientServiceImpl(
        ServiceForMaxDiscountPerClientRepository repository
        )
    {
        this.repository = repository;
    }

    @Transactional
    public List<ServiceForMaxDiscountPerClientDto> getServiceForMaxDiscountPerClient(
            Date startDate,
            Date endDate
        )
    {
        List<Object[]> result = repository.getServiceForMaxDiscountPerClient(
                startDate,
                endDate
        );
        return mapToObject(result);
    }

    private List<ServiceForMaxDiscountPerClientDto> mapToObject(List<Object[]> result) {
        List<ServiceForMaxDiscountPerClientDto> dtos = new ArrayList<>();

        for (Object[] row : result) {
            ServiceForMaxDiscountPerClientDto dto = new ServiceForMaxDiscountPerClientDto();
            dto.setClientId((Integer) row[0]);
            dto.setClientName((String) row[1]);
            dto.setLastName((String) row[2]);
            dto.setDni((Integer) row[3]);
            dto.setPhone(((BigInteger) row[4]).longValueExact());
            dto.setAdress((String) row[5]);
            dto.setStartDate(row[6] == null ? null : (Date) row[6]);
            dto.setClientEnabled((Boolean) row[7]);
            dto.setIsBussiness((Boolean) row[8]);
            dto.setBussinessName(row[9] == null ? "" : (String) row[9]);
            dto.setCuit(row[10] == null ? 0 : ((BigInteger) row[10]).longValueExact());
            dto.setServiceId((Integer) row[11]);
            dto.setServiceName((String) row[12]);
            dto.setDescription((String) row[13]);
            dto.setBasePrice((Double) row[14]);
            dto.setIsSpecial((Boolean) row[15]);
            dto.setSuportCharge((Double) row[16]);
            dto.setServiceEnabled((Boolean) row[17]);
            dto.setOrderDate((Date) row[18]);
            dto.setTotalDiscount((Double) row[19]);
            dtos.add(dto);
        }

        return dtos;
    }
}