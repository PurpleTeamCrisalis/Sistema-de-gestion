package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;

@Component
public class ServiceDetailFactory {

  public ServiceDetail CreateEntity(
    ServiceEntity serviceEntity
  ) {
    ServiceDetail serviceDetail = ServiceDetail
      .builder()
      .service(serviceEntity)
      .subTotal(0.00)
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
    .id(serviceDetail.getId())
    .serviceId(serviceDetail.getService().getId())
    .subTotal(serviceDetail.getSubTotal())
    .taxesApplied(serviceDetail.getTaxesApplied())
    .taxCharges(serviceDetail.getTaxCharges())
    .build();
  }
}
