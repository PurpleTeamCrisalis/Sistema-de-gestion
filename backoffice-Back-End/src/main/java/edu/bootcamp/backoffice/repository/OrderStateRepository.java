package edu.bootcamp.backoffice.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.bootcamp.backoffice.model.order.*;
public interface OrderStateRepository extends JpaRepository<Order, Integer> {

}
