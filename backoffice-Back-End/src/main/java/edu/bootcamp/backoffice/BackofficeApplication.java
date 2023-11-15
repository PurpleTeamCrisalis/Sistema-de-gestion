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
			if (
					taxRepository.findAll().isEmpty() &&
					serviceRepository.findAll().isEmpty() &&
					productRepository.findAll().isEmpty() &&
					clientRepository.findAll().isEmpty()
				)
			{
				TaxFactory taxFactory = new TaxFactory();
				ChargeRequest taxRequest = new ChargeRequest("IIBB", 10);
				Tax tax = taxFactory.CreateEntityForInsertNewRecord(taxRequest);
				taxRepository.save(tax);
				ServiceFactory serviceFactory = new ServiceFactory();
				ServiceEntity service = serviceFactory.CreateServiceEntity(
						"Servico de 100",
						"Un servico de $100. SuportChage de $10",
						100.0,
						Boolean.TRUE,
						10.0
				);
				List<Tax> taxes = new ArrayList<>();
				taxes.add(tax);
				service.setTaxes(taxes);
				serviceRepository.save(service);
				ProductFactory productFactory = new ProductFactory();
				Product product = productFactory.CreateProductEntity(
						"Producto de 200",
						"Un producto de $200",
						200.0
				);
				product.setTaxes(taxes);
				productRepository.save(product);
				Client client =  new Client();
				client.setName("diego");
				client.setLastName("paez");
				client.setDni(46013734);
				client.setPhone(43512226L);
				client.setAdress("ca1lle siempre viva");
				client.setIsBussiness(Boolean.TRUE);
				client.setBussinessName("x.srl");
				client.setStartDate(Date.valueOf("2023-10-31"));
				client.setCuit(27137460350L);
				client.setEnabled(Boolean.TRUE);
				clientRepository.save(client);
			}
		};
	}
}
