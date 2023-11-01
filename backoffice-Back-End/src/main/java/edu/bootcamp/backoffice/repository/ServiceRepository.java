package edu.bootcamp.backoffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bootcamp.backoffice.model.service.ServiceEntity;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
	public Optional<ServiceEntity> findById(Integer id);

	public Optional<ServiceEntity> findByName(String name);

}