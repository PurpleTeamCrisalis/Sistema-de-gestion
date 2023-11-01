package edu.bootcamp.backoffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.service.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
	public Optional<Service> findById(Integer id);

	public Optional<Service> findByName(String name);

}