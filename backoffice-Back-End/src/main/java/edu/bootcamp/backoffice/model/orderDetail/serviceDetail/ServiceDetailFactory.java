package edu.bootcamp.backoffice.model.orderDetail.serviceDetail;

import edu.bootcamp.backoffice.model.order.Order;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;

@Component
public class ServiceDetailFactory {


  public ServiceDetail CreateServiceDetailEntity (
          Order order,
          ServiceEntity serviceEntity
          )
  {
    return ServiceDetail
        .builder()
            .order(order)
            .serviceEntity(serviceEntity)
        .build();
  }
}
