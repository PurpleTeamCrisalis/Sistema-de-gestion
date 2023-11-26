package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.ticketOrdersHistory.TicketOrdersHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersHistoryRepository extends JpaRepository<TicketOrdersHistory, Integer> {

    @Procedure(procedureName = "ORDER_HISTORY")
    List<TicketOrdersHistory> ordersHistory();

}
