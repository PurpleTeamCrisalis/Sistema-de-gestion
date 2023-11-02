package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;

import java.security.Provider.Service;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.service.ServiceEntity;

@Component
public class ServiceDetailFactory {

  public ServiceDetail CreateEntity(
    ServiceEntity serviceEntity
  ) {
    ServiceDetail serviceDetail = ServiceDetail
      .builder()
      .service(serviceEntity)
      // .taxCharges(serviceEntity.getTaxCharges())
      // .taxesApplied(serviceEntity.getTaxesApplied())
      .build();
    serviceDetail.calculateSubtotal();
    serviceDetail.setTaxCharges(10.00);
    serviceDetail.setTaxesApplied("IVA - Ganancias - IIBB");
    return serviceDetail;
  }

  public ServiceDetailResponse CreateResponse(
    ServiceDetail serviceDetail
  ) {
    return ServiceDetailResponse
    .builder()
    .name(serviceDetail.getService().getName())
    .id(serviceDetail.getId())
    .basePrice(serviceDetail.getService().getBasePrice())
    .serviceId(serviceDetail.getService().getId())
    .subTotal(serviceDetail.getSubTotal())
    .taxesApplied(serviceDetail.getTaxesApplied())
    .taxCharges(serviceDetail.getTaxCharges())
    .build();
  }
}