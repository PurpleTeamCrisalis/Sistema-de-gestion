package edu.bootcamp.backoffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.Tax.Tax;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer>{

    public Optional<Tax> findByName(String name);
}
