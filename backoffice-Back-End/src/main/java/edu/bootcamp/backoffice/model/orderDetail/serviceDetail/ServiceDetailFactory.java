package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;

import java.util.List;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.service.ServiceEntity;

@Component
public class ServiceDetailFactory {

  public ServiceDetail CreateEntity(
    ServiceEntity serviceEntity,
    Order order
    )
  {
    ServiceDetail serviceDetail = ServiceDetail
      .builder()
      .service(serviceEntity)
      .taxesApplied(getTaxesApplied(serviceEntity.getAllTaxes()))
      .order(order)
      .build();
    return serviceDetail;
  }

  public ServiceDetailResponse createResponse(
    ServiceDetail serviceDetail
    )
  {
    return ServiceDetailResponse
    .builder()
    .id(serviceDetail.getId())
    .serviceId(serviceDetail.getService().getId())
    .subTotal(serviceDetail.getSubTotal())
    .taxesApplied(serviceDetail.getTaxesApplied())
    .name(serviceDetail.getService().getName())
    .basePrice(serviceDetail.getPriceWithoutTaxes())
    .build();
  }

  private String getTaxesApplied(List<Tax> taxes) {
    String taxesStr = "";
    for (Tax tax : taxes) {
      taxesStr += tax.getName() + " ";
    }
    return taxesStr;
  }
}
