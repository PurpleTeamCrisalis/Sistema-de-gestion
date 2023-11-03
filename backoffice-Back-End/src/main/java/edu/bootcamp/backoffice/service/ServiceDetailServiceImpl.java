package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.repository.ServiceDetailRepository;
import edu.bootcamp.backoffice.service.Interface.ServiceDetailService;
import edu.bootcamp.backoffice.service.Interface.ServiceService;

@Service
public class ServiceDetailServiceImpl implements ServiceDetailService{

  private final ServiceDetailRepository serviceDetailRepository;
  private final ServiceDetailFactory serviceDetailFactory;
  private final ServiceService serviceService;

  public ServiceDetailServiceImpl (
    ServiceDetailFactory serviceDetailFactory,
    ServiceDetailRepository serviceDetailRepository,
    ServiceService serviceService
  ) {
    this.serviceDetailFactory = serviceDetailFactory;
    this.serviceDetailRepository = serviceDetailRepository;
    this.serviceService = serviceService;
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
      ServiceEntity service = serviceService.getServiceById(serviceDetailRequest.getServiceId());
      // Creo la entidad serviceDetail
      ServiceDetail serviceDetail = serviceDetailFactory.CreateEntity(service);
      // Agrego serviceDetail a la orden
      services.add(serviceDetail);
    }
    return services;
  }
}
