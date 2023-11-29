package edu.bootcamp.backoffice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.order.Order;

@Repository
public interface TotalDiscountsService extends JpaRepository<Order, Integer> {
    @Procedure(name = "getTotalDiscountsService")
    List<Object[]> getTotalDiscountsService();
}

