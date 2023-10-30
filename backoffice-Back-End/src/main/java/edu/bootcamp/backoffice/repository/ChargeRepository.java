package edu.bootcamp.backoffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.bootcamp.backoffice.model.Charge.Charge;

@Repository
public interface ChargeRepository extends JpaRepository<Charge, Integer>{

    public Optional<Charge> findByName(String name);
}
