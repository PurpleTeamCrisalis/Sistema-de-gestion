package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;

public interface ServiceDetailService {
  public void registerServiceDetail (
    List<ServiceDetail> createServiceRequests,
    Order order
  );
  public List<ServiceDetail> getServicesDetails (
    List<ServiceDetailRequest> orderServiceRequests
  );
}
