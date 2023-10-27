package edu.bootcamp.backoffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.order.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

  public Optional<Order> findById(Integer id);
}
