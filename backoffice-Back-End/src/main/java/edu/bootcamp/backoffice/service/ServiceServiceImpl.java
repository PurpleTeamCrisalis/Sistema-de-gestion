package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyUpdatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.InvalidCredentialsException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.ProductFactory;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.service.dto.UpdateServiceRequest;
import edu.bootcamp.backoffice.repository.ProductRepository;
import edu.bootcamp.backoffice.repository.ServiceRepository;
import edu.bootcamp.backoffice.service.Interface.ProductService;
import edu.bootcamp.backoffice.service.Interface.ServiceService;
import edu.bootcamp.backoffice.service.Interface.Validator;

@Service
public class ServiceServiceImpl implements ServiceService {
	private final ServiceRepository serviceRepository;
	private final ServiceFactory dtoFactory;
	private final Validator validator;

	public ServiceServiceImpl(ServiceRepository serviceRepository, ServiceFactory dtoFactory, Validator validator) {
		this.serviceRepository = serviceRepository;
		this.dtoFactory = dtoFactory;
		this.validator = validator;

	}

	public boolean isPresent(ServiceRequest serviceDto) {
		StringBuilder errors = new StringBuilder();
		validateName(serviceDto.getName(), errors);
		if (errors.length() > 0)
			throw new InvalidCredentialsException("Invalid Product Name");
		Optional<edu.bootcamp.backoffice.model.service.Service> result = serviceRepository.findByServiceName(serviceDto.getName());
		if (result.isPresent())
			return !result.get().isDeleted();
		return false;
	}

	private void validateNewServiceDbConflicts(ServiceRequest serviceRequest) {
		Optional<edu.bootcamp.backoffice.model.service.Service> result = serviceRepository.findByServiceName(serviceRequest.getName());
		if (result.isPresent())
			throw new AlreadyRegisteredException("Already registered Service");
	}

	private void validateNewServiceRequest(ServiceRequest serviceRequest) {
		StringBuilder errors = new StringBuilder();
		validateName(serviceRequest.getName(), errors);
		validateDescription(serviceRequest.getDescription(), errors);
		validateErrors(errors);
	}

	private void validateUpdateRequest(int id, UpdateServiceRequest serviceRequest) {
		StringBuilder errors = new StringBuilder();
		validator.validateIdFormat(id, errors);
		if (serviceRequest.getName() != null)
			validateName(serviceRequest.getName(), errors);
		if (serviceRequest.getDescription() != null)
			validateDescription(serviceRequest.getDescription(), errors);
		validateErrors(errors);
	}

	private edu.bootcamp.backoffice.model.service.Service validateUpdateConflicts(int id, UpdateServiceRequest serviceDto) {
		Optional<edu.bootcamp.backoffice.model.service.Service> result = serviceRepository.findByServiceName(serviceDto.getName());
		edu.bootcamp.backoffice.model.service.Service service;
		boolean modified = !result.isPresent();
		if (modified) {
			service = findAndSetServicenameIfNotNull(id, serviceDto.getName());
		} else {
			service = validateEnabledServiceSearchResult(result, id);
			modified |= mergeEnabled(serviceDto, service);
			if (!modified) {
				throw new AlreadyUpdatedException("Not modified database.");
			}

		}
		return service;
	}

	private edu.bootcamp.backoffice.model.service.Service validateEnabledServiceSearchResult(Optional<edu.bootcamp.backoffice.model.service.Service> result, int requesteId) {
		edu.bootcamp.backoffice.model.service.Service service = result.get();
		/*
		 * Si se decide evitar dar alta logica : if(user.isDeleted()) throw new
		 * DeletedAccountUpdateException("");
		 */
		if (service.getId() != requesteId)
			throw new AlreadyRegisteredException("Already registered service");
		return service;
	}

	private edu.bootcamp.backoffice.model.service.Service findAndSetServicenameIfNotNull(int id, String name) {
		edu.bootcamp.backoffice.model.service.Service service = validator.completeValidationForId(id, serviceRepository);
		if (name != null)
			service.setName(name);
		;
		return service;
	}

	private boolean mergeEnabled(UpdateServiceRequest serviceDto, edu.bootcamp.backoffice.model.service.Service service) {
		Boolean dtoEnabled = serviceDto.getEnabled();
		Boolean serviceEnabled = service.isEnabled();
		if (dtoEnabled != null && !serviceEnabled.equals(dtoEnabled)) {
			service.setEnabled(serviceDto.getEnabled());
			return true;
		}
		return false;
	}

	public List<ServiceResponse> getProducts() {
		List<edu.bootcamp.backoffice.model.service.Service> services = serviceRepository.findAll();
		List<ServiceResponse> dtos = new ArrayList<>();
		for (edu.bootcamp.backoffice.model.service.Service s : services)
			dtos.add(dtoFactory.createResponse(s));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered services.");
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
	public ServiceResponse registerService(ServiceRequest serviceDto) {
		validateNewServiceRequest(serviceDto);
		String description = serviceDto.getDescription();
		double priceBase = serviceDto.getBasePrice();
		serviceDto.setDescription(description);
		;
		serviceDto.setBasePrice(priceBase);
		validateNewServiceDbConflicts(serviceDto);
		edu.bootcamp.backoffice.model.service.Service service = dtoFactory.CreateEntityForInsertNewRecord(serviceDto);
		service = serviceRepository.save(service);
		return dtoFactory.createResponse(service);
	}

	@Override
	public ServiceResponse get(int id) {
		edu.bootcamp.backoffice.model.service.Service service = validator.completeValidationForId(id, serviceRepository);
		return dtoFactory.createResponse(service);
	}

	@Override
	public ServiceResponse update(int id, UpdateServiceRequest serviceDto) throws InvalidIdFormatException {
		validateUpdateRequest(id, serviceDto);
		edu.bootcamp.backoffice.model.service.Service service = validateUpdateConflicts(id, serviceDto);
		service = serviceRepository.save(service);
		return dtoFactory.createResponse(service);
	}

	@Override
	public ServiceResponse delete(int id) throws InvalidIdFormatException {
		edu.bootcamp.backoffice.model.service.Service service = validator.validateSoftDeletableEntityExistence(id, serviceRepository);
		List<Tax> taxs = service.getTaxs();
		if (taxs.size() > 0) {
			service.setEnabled(false);
			serviceRepository.save(service);
		} else
			serviceRepository.delete(service);
		return dtoFactory.createResponse(service);
	}

	@Override
	public List<ServiceResponse> get() throws InvalidIdFormatException {
		List<edu.bootcamp.backoffice.model.service.Service> services = serviceRepository.findAll();
		List<ServiceResponse> dtos = new ArrayList<>();
		for (edu.bootcamp.backoffice.model.service.Service s : services)
			dtos.add(dtoFactory.createResponse(s));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered services.");
		return dtos;
	}}
