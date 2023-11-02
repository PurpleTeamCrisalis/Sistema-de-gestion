package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public Optional<User> findByUsername(String username);

	Optional<User> findByUsernameAndPassword(String username, String password);
}
