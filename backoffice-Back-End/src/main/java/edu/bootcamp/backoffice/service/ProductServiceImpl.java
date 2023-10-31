package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyUpdatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.InvalidCredentialsException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.ProductFactory;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.UserFactory;
import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.repository.ProductRepository;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.service.Interface.ProductService;
import edu.bootcamp.backoffice.service.Interface.UserService;
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

	public boolean isPresent(ProductRequest productDto) {
		StringBuilder errors = new StringBuilder();
		validateName(productDto.getName(), errors);
		if (errors.length() > 0)
			throw new InvalidCredentialsException("Invalid Product Name");
		Optional<Product> result = productRepository.findByProductName(productDto.getName());
		if (result.isPresent())
			return !result.get().isDeleted();
		return false;
	}

	private void validateNewProductDbConflicts(ProductRequest productRequest) {
		Optional<Product> result = productRepository.findByProductName(productRequest.getName());
		if (result.isPresent())
			throw new AlreadyRegisteredException("Already registered product");
	}

	private void validateNewProductRequest(ProductRequest productRequest) {
		StringBuilder errors = new StringBuilder();
		validateName(productRequest.getName(), errors);
		validateDescription(productRequest.getDescription(), errors);
		validateErrors(errors);
	}

	private void validateUpdateRequest(int id, UpdateProductRequest productRequest) {
		StringBuilder errors = new StringBuilder();
		validator.validateIdFormat(id, errors);
		if (productRequest.getName() != null)
			validateName(productRequest.getName(), errors);
		if (productRequest.getDescription() != null)
			validateDescription(productRequest.getDescription(), errors);
		validateErrors(errors);
	}

	private Product validateUpdateConflicts(int id, UpdateProductRequest productDto) {
		Optional<Product> result = productRepository.findByProductName(productDto.getName());
		Product product;
		boolean modified = !result.isPresent();
		if (modified) {
			product = findAndSetProductnameIfNotNull(id, productDto.getName());
		} else {
			product = validateEnabledProductSearchResult(result, id);
			modified |= mergeEnabled(productDto, product);
			if (!modified) {
				throw new AlreadyUpdatedException("Not modified database.");
			}

		}
		return product;
	}

	private Product validateEnabledProductSearchResult(Optional<Product> result, int requesteId) {
		Product product = result.get();
		/*
		 * Si se decide evitar dar alta logica : if(user.isDeleted()) throw new
		 * DeletedAccountUpdateException("");
		 */
		if (product.getId() != requesteId)
			throw new AlreadyRegisteredException("Already registered product");
		return product;
	}

	private Product findAndSetProductnameIfNotNull(int id, String name) {
		Product product = validator.completeValidationForId(id, productRepository);
		if (name != null)
			product.setName(name);
		;
		return product;
	}

	private boolean mergeEnabled(UpdateProductRequest productDto, Product product) {
		Boolean dtoEnabled = productDto.getEnabled();
		Boolean productEnabled = product.isEnabled();
		if (dtoEnabled != null && !productEnabled.equals(dtoEnabled)) {
			product.setEnabled(productDto.getEnabled());
			return true;
		}
		return false;
	}

	public List<ProductResponse> getProducts() {
		List<Product> products = productRepository.findAll();
		List<ProductResponse> dtos = new ArrayList<>();
		for (Product p : products)
			dtos.add(dtoFactory.createResponse(p));
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
		validator.validateVarchar(name, EntitiesConstraints.USERNAME_MIN_LENGTH,
				EntitiesConstraints.USERNAME_MAX_LENGTH, errorBuilder, "name");
	}

	private void validateDescription(String description, StringBuilder errorBuilder) {
		validator.validateVarchar(description, EntitiesConstraints.DESCRIPTION_MAX_LENGTH,
				EntitiesConstraints.DESCRIPTION_MAX_LENGTH, errorBuilder, "description");
	}

	@Override
	public ProductResponse registerProduct(ProductRequest productDto) {
		validateNewProductRequest(productDto);
		String description = productDto.getDescription();
		double priceBase = productDto.getBasePrice();
		productDto.setDescription(description);
		;
		productDto.setBasePrice(priceBase);
		validateNewProductDbConflicts(productDto);
		Product product = dtoFactory.CreateEntityForInsertNewRecord(productDto);
		product = productRepository.save(product);
		return dtoFactory.createResponse(product);

	}

	@Override
	public ProductResponse get(int id) {
		Product product = validator.completeValidationForId(id, productRepository);
		return dtoFactory.createResponse(product);
	}

	@Override
	public ProductResponse update(int id, UpdateProductRequest productDto) throws InvalidIdFormatException {
		validateUpdateRequest(id, productDto);
		Product product = validateUpdateConflicts(id, productDto);
		product = productRepository.save(product);
		return dtoFactory.createResponse(product);
	}

	@Override
	public ProductResponse delete(int id) throws InvalidIdFormatException {
		Product product = validator.validateSoftDeletableEntityExistence(id, productRepository);
		List<Tax> taxs = product.getTaxs();
		if (taxs.size() > 0) {
			product.setEnabled(false);
			productRepository.save(product);
		} else
			productRepository.delete(product);
		return dtoFactory.createResponse(product);
	}

	@Override
	public List<ProductResponse> get() throws InvalidIdFormatException {
		List<Product> products = productRepository.findAll();
		List<ProductResponse> dtos = new ArrayList<>();
		for (Product p : products)
			dtos.add(dtoFactory.createResponse(p));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered products.");
		return dtos;
	}
}