package edu.bootcamp.backoffice.model.product;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;

@Component
public class ProductFactory {

	public Product CreateProductEntity(String name, String description, double basePrice) {

		return Product.builder().name(name).description(description).basePrice(basePrice).enabled(true).build();
	}

	public Product CreateEntityForInsertNewRecord(ProductRequest ProductDto) {

		return Product.builder().name(ProductDto.getName()).description(ProductDto.getDescription())
				.basePrice(ProductDto.getBasePrice()).enabled(true).build();

	}

	public ProductResponse createResponse(Product product) {

		return ProductResponse.builder().name(product.getName()).description(product.getDescription())
				.basePrice(product.getBasePrice()).enabled(product.isEnabled()).build();
	}

}