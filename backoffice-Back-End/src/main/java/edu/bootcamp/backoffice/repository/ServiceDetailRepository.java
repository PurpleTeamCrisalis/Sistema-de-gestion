package edu.bootcamp.backoffice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;

public interface ServiceDetailRepository extends JpaRepository<ServiceDetail, Integer> {
  public Optional<List<ServiceDetail>> findAllByOrderId(Integer orderId); 
}
