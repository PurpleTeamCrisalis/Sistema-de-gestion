package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.serviceEntity.ServiceEntity;
import edu.bootcamp.backoffice.repository.ServiceDetailRepository;
import edu.bootcamp.backoffice.service.Interface.ServiceDetailService;

@Service
public class ServiceDetailServiceImpl implements ServiceDetailService{

  private final ServiceDetailRepository serviceDetailRepository;
  private final ServiceDetailFactory serviceDetailFactory;

  public ServiceDetailServiceImpl (
    ServiceDetailFactory serviceDetailFactory,
    ServiceDetailRepository serviceDetailRepository
  ) {
    this.serviceDetailFactory = serviceDetailFactory;
    this.serviceDetailRepository = serviceDetailRepository;
  }

  public void registerServiceDetail(
    List<ServiceDetail> createServiceRequests,
    Order order
  ) {
    for (ServiceDetail serviceDetail : createServiceRequests) {
      // Guardo serviceDetail en la BD (tabla service_detail)
      serviceDetail.setOrder(order);
      serviceDetailRepository.save(serviceDetail);
    }
  }

  public List<ServiceDetail> getServicesDetails(
    List<ServiceDetailRequest> orderServiceRequests
  ) {
    List<ServiceDetail> services = new ArrayList<ServiceDetail>();
    for (ServiceDetailRequest serviceDetailRequest : orderServiceRequests) {
      // Valido que exista Service --Por ahora lo hardcodeo jeje--
      ServiceEntity service = new ServiceEntity(); // serviceService.get(serviceDetailRequest.getId())
      service.setId(serviceDetailRequest.getServiceId());
      service.setBasePrice(100.00);
      // Creo la entidad serviceDetail
      ServiceDetail serviceDetail = serviceDetailFactory.CreateEntity(service);
      // Agrego serviceDetail a la orden
      services.add(serviceDetail);
    }
    return services;
  }
}
