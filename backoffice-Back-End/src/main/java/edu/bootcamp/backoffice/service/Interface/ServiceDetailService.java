package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;

public interface ServiceDetailService {
  public List<ServiceDetailResponse> registerServiceDetail (
    List<ServiceDetail> createServiceRequests
  );
  public List<ServiceDetail> getServicesDetails (
    List<ServiceDetailRequest> orderServiceRequests
  );

  public List<ServiceDetailResponse>getServicesDetailsByOrder(
    Integer orderId
  );
  
}
