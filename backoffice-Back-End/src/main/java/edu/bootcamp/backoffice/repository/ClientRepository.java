package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    public Optional<Client> findById(
            Integer id
    );

    public Optional<Client> findByDni(
            Integer dni
    );

}
