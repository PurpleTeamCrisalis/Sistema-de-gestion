package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.Tax.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaxByOrderRepository extends JpaRepository<Tax, Integer>{
}
