package edu.bootcamp.backoffice;

import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.UserFactory;
import edu.bootcamp.backoffice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackofficeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackofficeApplication.class, args);
	}
	@Bean
	public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return (args) -> {
			if (userRepository.findByUsername("admin").isEmpty())
			{
				UserFactory factory = new UserFactory();
				User user = factory.CreateUserEntity(
						"admin",
						passwordEncoder.encode("admin")
				);
				userRepository.save(user);
			}
		};
	}
}
