package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.EmptyElementException;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetailFactory;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailRequest;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
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

  public List<ServiceDetailResponse> registerServiceDetail(
    List<ServiceDetail> createServiceRequests
  ) {
    // Creo la lista de services donde almaceno los ServiceDetailResponse
    List<ServiceDetailResponse> services = new ArrayList<ServiceDetailResponse>();
    for (ServiceDetail serviceDetail : createServiceRequests) {
      // Guardo serviceDetail en la BD (tabla service_detail)
      serviceDetail = serviceDetailRepository.save(serviceDetail);
      // Agrego serviceDetailResponse a lista services
      services.add(serviceDetailFactory.CreateResponse(serviceDetail));
    }
    // Retorno la lista de serviceDetailResponse
    return services;
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

  public List<ServiceDetailResponse> getServicesDetailsByOrder(Integer orderId) {
    // Validacion de que existan ServicesDetails
    List<ServiceDetail> dbServicesDetails = serviceDetailRepository.findAllByOrderId(orderId).orElse(null);
    if(dbServicesDetails == null)
      throw new EmptyElementException("No services details were found for that order.");
    
    List<ServiceDetailResponse> servicesResponse = new ArrayList<ServiceDetailResponse>();
    for(ServiceDetail serviceDetail : dbServicesDetails) {
      ServiceDetailResponse serviceDetailResponse = serviceDetailFactory.CreateResponse(serviceDetail);
      servicesResponse.add(serviceDetailResponse);
    }
    return servicesResponse;
  }
}
