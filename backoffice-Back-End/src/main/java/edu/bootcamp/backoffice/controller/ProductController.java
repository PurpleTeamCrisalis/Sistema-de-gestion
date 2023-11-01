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

import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;

import edu.bootcamp.backoffice.service.Interface.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

	private final ProductService productService;

	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductResponse> registerProduct(@RequestBody ProductRequest createRequest) {
		ProductResponse productDto = productService.registerProduct(createRequest);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(productDto.getId())
				.toUri();
		return ResponseEntity.created(location).body(productDto);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductResponse> getProduct(@PathVariable int id) {
		ProductResponse product = productService.get(id);
		return ResponseEntity.ok(product);
	}

	@GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ProductResponse>> getAllProducts() {
		List<ProductResponse> products = productService.get();
		return ResponseEntity.ok(products);
	}

	@PatchMapping(path = "update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductResponse> updateProduct(@PathVariable int id,
			@RequestBody UpdateProductRequest productDto) {
		ProductResponse product = productService.update(id, productDto);
		return ResponseEntity.ok(product);
	}

	@DeleteMapping(value = "delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductResponse> deleteProduct(@PathVariable int id) {
		ProductResponse product = productService.delete(id);
		return ResponseEntity.ok(product);
	}

}
