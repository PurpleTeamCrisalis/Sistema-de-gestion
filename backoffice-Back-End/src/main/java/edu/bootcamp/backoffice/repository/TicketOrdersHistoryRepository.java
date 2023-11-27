package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketOrdersHistoryRepository extends JpaRepository<Order, Integer> {

    @Procedure(procedureName = "ORDERS_HISTORY")
    List<Object[]> ordersHistory();

}
