package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.serviceEntity.Service;

@Component
public class ServiceDetailFactory {

  private final ServiceService serviceService;

  public ServiceDetailFactory(
    ServiceService serviceService
  ) {
    this.serviceService = serviceService;
  }

  public ServiceDetail CreateServiceDetailEntity (ServiceDetailRequest serviceDetailDTO) {

    Service service = serviceService.getServiceById(serviceDetailDTO.getServiceId())

    return ServiceDetail 
        .builder()
        .id(null)
        .build();
  }
}
