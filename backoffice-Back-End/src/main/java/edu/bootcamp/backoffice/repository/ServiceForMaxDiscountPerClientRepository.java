package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ServiceForMaxDiscountPerClientRepository
        extends JpaRepository<Order, Integer>
{
    @Procedure(name = "GetServiceForMaxDiscountPerClient")
    List<Object[]> getServiceForMaxDiscountPerClient(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
}
