package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.service.Interface.TaxService;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.ProductFactory;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;
import edu.bootcamp.backoffice.repository.ProductRepository;
import edu.bootcamp.backoffice.service.Interface.ProductService;
import edu.bootcamp.backoffice.service.Interface.Validator;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;
	private final ProductFactory dtoFactory;
	private final Validator validator;

	public ProductServiceImpl(ProductRepository productRepository, ProductFactory dtoFactory, Validator validator) {
		this.productRepository = productRepository;
		this.dtoFactory = dtoFactory;
		this.validator = validator;

	}
/*
	public boolean isPresent(ProductRequest productDto) {
		StringBuilder errors = new StringBuilder();
		validateName(productDto.getName(), errors);
		if (errors.length() > 0)
			throw new InvalidCredentialsException("Invalid Product Name");
		Optional<Product> result = productRepository.findByName(productDto.getName());
		if (result.isPresent())
			return !result.get().isDeleted();
		return false;
	}
*/
	private void validateNewProductDbConflicts(ProductRequest productRequest) {
		Optional<Product> result = productRepository.findByName(productRequest.getName());
		if (result.isPresent())
			throw new AlreadyRegisteredException("Already registered product");
	}

	private void validateNewProductRequest(ProductRequest productRequest) {
		StringBuilder errors = new StringBuilder();
		validateName(productRequest.getName(), errors);
		validateDescription(productRequest.getDescription(), errors);
		validator.validateLongValue(
				(long)productRequest.getBasePrice(),
				Long.MAX_VALUE,
				1L,
				"Base price",
				errors
				);
		validateErrors(errors);
	}

	private Product validateUpdateRequest(int id, UpdateProductRequest productRequest) {
		StringBuilder errors = new StringBuilder();
		Product product = validator.validateIdExistence(
				id,
				productRepository
		);
		if (productRequest.getName() != null)
		{
			validateName(productRequest.getName(), errors);
			product.setName(productRequest.getName());
		}
		if (productRequest.getDescription() != null) {
			validateDescription(productRequest.getDescription(), errors);
			product.setDescription(productRequest.getDescription());
		}
		if(productRequest.getBasePrice() > 0)
			product.setBasePrice(productRequest.getBasePrice());
		else
			validator.validateLongValue(
					(long)productRequest.getBasePrice(),
					Long.MAX_VALUE,
					0L,
					"Base price",
					errors
			);
		if(productRequest.getEnabled() != null)
			product.setEnabled(productRequest.getEnabled());
		validateErrors(errors);
		return product;
	}

/*
	private Product validateEnabledProductSearchResult(Optional<Product> result, int requesteId) {
		Product product = result.get();
		/*
		 * Si se decide evitar dar alta logica : if(user.isDeleted()) throw new
		 * DeletedAccountUpdateException("");
		 *
		if (product.getId() != requesteId)
			throw new AlreadyRegisteredException("Already registered product");
		return product;
	}
*
	private boolean mergeEnabled(UpdateProductRequest productDto, Product product) {
		Boolean dtoEnabled = productDto.getEnabled();
		Boolean productEnabled = product.isEnabled();
		if (dtoEnabled != null && !productEnabled.equals(dtoEnabled)) {
			product.setEnabled(productDto.getEnabled());
			return true;
		}
		return false;
	}
*/
	public List<ProductResponse> getProducts() {
		List<Product> products = productRepository.findAll();
		List<ProductResponse> dtos = new ArrayList<>();
		for (Product p : products)
			dtos.add(dtoFactory.createProductResponse(p));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered products.");
		return dtos;
	}

	/*
	 * public ProductResponse deleteProduct(int id) { Product product =
	 * validator.validateSoftDeletableEntityExistence(id, productRepository);
	 * List<Tax> taxs = product.getTaxs(); if (taxs.size() > 0) {
	 * product.setEnabled(false); productRepository.save(product); } else
	 * productRepository.delete(product); return dtoFactory.createResponse(product);
	 * }
	 */

	private void validateErrors(StringBuilder errors) {
		if (errors.length() != 0)
			throw new InvalidArgumentsFormatException(errors.toString());
	}

	private void validateName(String name, StringBuilder errorBuilder) {
		validator.validateVarchar(name, EntitiesConstraints.ITEM_NAME_MIN_LENGTH,
				EntitiesConstraints.ITEM_NAME_MAX_LENGTH, errorBuilder, "name");
	}

	private void validateDescription(String description, StringBuilder errorBuilder) {
		validator.validateVarchar(description, 1,
				EntitiesConstraints.DESCRIPTION_MAX_LENGTH, errorBuilder, "description");
	}

	@Override
	public ProductResponse registerProduct(ProductRequest productDto) {
		validateNewProductRequest(productDto);
		validateNewProductDbConflicts(productDto);
		Product product = dtoFactory.CreateEntityForInsertNewRecord(productDto);
		product = productRepository.save(product);
		return dtoFactory.createProductResponse(product);
	}

	@Override
	public ProductResponse get(int id) {
		Product product = validator.completeValidationForId(id, productRepository);
		return dtoFactory.createProductResponse(product);
	}

	public Product getProductById(Integer id) {
		return validator.completeValidationForId(id, productRepository);
	}

	@Override
	public ProductResponse update(int id, UpdateProductRequest productDto) {
		Product product = validateUpdateRequest(id, productDto);
		product = productRepository.save(product);
		return dtoFactory.createProductResponse(product);
	}

	@Override
	public ProductResponse delete(int id) {
		Product product = validator.validateIdExistence(id, productRepository);
		/*
		Set<Tax> taxes = product.getTaxes();
		taxes.clear();
		*/
		// List<Taxs> taxs = product.getTaxs();
		// if (taxs.size() > 0) {
		// 	product.setEnabled(false);
		// 	productRepository.save(product);
		// } else
		productRepository.delete(product);
		return dtoFactory.createProductResponse(product);
	}

	@Override
	public List<ProductResponse> get() {
		List<Product> products = productRepository.findAll();
		List<ProductResponse> dtos = new ArrayList<>();
		for (Product p : products)
			dtos.add(dtoFactory.createProductResponse(p));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered products.");
		return dtos;
	}
}