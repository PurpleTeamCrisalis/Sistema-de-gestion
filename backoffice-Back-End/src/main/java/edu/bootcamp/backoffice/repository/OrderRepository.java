package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.order.Order;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    public Optional<Order> findById(
            Integer id
    );

}
