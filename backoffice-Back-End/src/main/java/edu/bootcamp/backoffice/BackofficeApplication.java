package edu.bootcamp.backoffice;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.client.Client;
import edu.bootcamp.backoffice.model.client.ClientFactory;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.ProductFactory;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.UserFactory;
import edu.bootcamp.backoffice.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.util.*;

@SpringBootApplication
public class BackofficeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackofficeApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(
			ServiceRepository serviceRepository,
			ProductRepository productRepository,
			ClientRepository clientRepository,
			TaxRepository taxRepository,
			UserRepository userRepository,
			PasswordEncoder passwordEncoder
	)
	{
		return (args) -> {
			if (userRepository.findByUsername("admin").isEmpty())
			{
				UserFactory factory = new UserFactory();
				User user = factory.CreateUserEntity(
						"admin",
//						"admin@finnegans.com",
						"lucianomalleret8@gmail.com",
						passwordEncoder.encode("admin")
				);
				userRepository.save(user);
			}
        };
	}
}
