package edu.bootcamp.backoffice.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;
import edu.bootcamp.backoffice.model.service.Service;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.service.dto.UpdateServiceRequest;
import edu.bootcamp.backoffice.service.Interface.ProductService;
import edu.bootcamp.backoffice.service.Interface.ServiceService;

@RestController
@RequestMapping("/service")
public class ServiceController {

	private final ServiceService serviceService;

	@Autowired
	public ServiceController(ServiceService serviceService) {
		this.serviceService = serviceService;
	}

	@PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceResponse> registerService(@RequestBody ServiceRequest createRequest) {
		ServiceResponse serviceDto = serviceService.registerService(createRequest);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(serviceDto.getId())
				.toUri();
		return ResponseEntity.created(location).body(serviceDto);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceResponse> getService(@PathVariable int id) {
		ServiceResponse service = serviceService.get(id);
		return ResponseEntity.ok(service);
	}

	@GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Service>> getAllServices() {
		List<Service> services = serviceService.get();
		return ResponseEntity.ok(services);
	}

	@PatchMapping(path = "update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceResponse> updateService(@PathVariable int id,
			@RequestBody UpdateServiceRequest serviceDto) {
		ServiceResponse service = serviceService.update(id, serviceDto);
		return ResponseEntity.ok(service);
	}

	@DeleteMapping(value = "delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ServiceResponse> deleteService(@PathVariable int id) {
		ServiceResponse service = serviceService.delete(id);
		return ResponseEntity.ok(service);
	}

}
