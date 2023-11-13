package edu.bootcamp.backoffice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import edu.bootcamp.backoffice.model.service.ServiceEntity;
import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyRegisteredException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.AlreadyUpdatedException;
import edu.bootcamp.backoffice.exception.custom.dbValidation.EmptyTableException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.service.ServiceFactory;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.service.dto.UpdateServiceRequest;
import edu.bootcamp.backoffice.repository.ServiceRepository;
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
/*
	public boolean isPresent(ServiceRequest serviceDto) {
		StringBuilder errors = new StringBuilder();
		validateName(serviceDto.getName(), errors);
		if (errors.length() > 0)
			throw new InvalidCredentialsException("Invalid Product Name");
		Optional<edu.bootcamp.backoffice.model.service.Service> result = serviceRepository.findByName(serviceDto.getName());
		if (result.isPresent())
			return !result.get().isDeleted();
		return false;
	}
*/
	private void validateNewServiceDbConflicts(ServiceRequest serviceRequest) {
		Optional<ServiceEntity> result = serviceRepository.findByName(serviceRequest.getName());
		if (result.isPresent())
			throw new AlreadyRegisteredException("Already registered Service");
	}

	private void validateNewServiceRequest(ServiceRequest serviceRequest) {
		StringBuilder errors = new StringBuilder();
		validateName(serviceRequest.getName(), errors);
		validateDescription(serviceRequest.getDescription(), errors);
		validator.validateLongValue(
				(long)serviceRequest.getBasePrice(),
				Long.MAX_VALUE,
				1L,
				"Base price",
				errors
		);
		validateErrors(errors);
	}

	private ServiceEntity validateUpdateRequest(int id, UpdateServiceRequest serviceRequest) {
		StringBuilder errors = new StringBuilder();
		ServiceEntity service = validator.validateIdExistence(
				id,
				serviceRepository
		);
		if (serviceRequest.getName() != null)
		{
			validateName(serviceRequest.getName(), errors);
			service.setName(serviceRequest.getName());
		}
		if (serviceRequest.getDescription() != null) {
			validateDescription(serviceRequest.getDescription(), errors);
			service.setDescription(serviceRequest.getDescription());
		}
		if(serviceRequest.getBasePrice() > 0)
			service.setBasePrice(serviceRequest.getBasePrice());
		else
			validator.validateLongValue(
					(long)serviceRequest.getBasePrice(),
					Long.MAX_VALUE,
					0L,
					"Base price",
					errors
			);
		if(serviceRequest.getEnabled() != null)
			service.setEnabled(serviceRequest.getEnabled());
		if(serviceRequest.getIsSpecial() != null){
			service.setSpecial(serviceRequest.getIsSpecial());
			if (serviceRequest.getIsSpecial()){
				if(serviceRequest.getBasePrice() > 0)
					service.setSuportCharge(serviceRequest.getSuportCharge());
				else
					validator.validateLongValue(
							(long)serviceRequest.getSuportCharge(),
							Long.MAX_VALUE,
							0L,
							"Support Charge",
							errors
					);
			}else{
				service.setSuportCharge(0.0);
			}
		}
		validateErrors(errors);
		return service;

	}

	/*
	private ServiceEntity validateUpdateConflicts(int id, UpdateServiceRequest serviceDto) {
		Optional<ServiceEntity> result = serviceRepository.findByName(serviceDto.getName());
		ServiceEntity serviceEntity;
		boolean modified = !result.isPresent();
		if (modified) {
			serviceEntity = findAndSetServicenameIfNotNull(id, serviceDto.getName());
		} else {
			serviceEntity = validateEnabledServiceSearchResult(result, id);
			modified |= mergeEnabled(serviceDto, serviceEntity);
			if (!modified) {
				throw new AlreadyUpdatedException("Not modified database.");
			}

		}
		return serviceEntity;
	}
*//*
	private ServiceEntity validateEnabledServiceSearchResult(Optional<ServiceEntity> result, int requesteId) {
		ServiceEntity serviceEntity = result.get();

		if (serviceEntity.getId() != requesteId)
			throw new AlreadyRegisteredException("Already registered service");
		return serviceEntity;
	}
*//*
	private ServiceEntity findAndSetServicenameIfNotNull(int id, String name) {
		ServiceEntity serviceEntity = validator.completeValidationForId(id, serviceRepository);
		if (name != null)
			serviceEntity.setName(name);
		;
		return serviceEntity;
	}

	private boolean mergeEnabled(UpdateServiceRequest serviceDto, ServiceEntity serviceEntity) {
		Boolean dtoEnabled = serviceDto.getEnabled();
		Boolean serviceEnabled = serviceEntity.isEnabled();
		if (dtoEnabled != null && !serviceEnabled.equals(dtoEnabled)) {
			serviceEntity.setEnabled(serviceDto.getEnabled());
			return true;
		}
		return false;
	}*/

	public List<ServiceResponse> getProducts() {
		List<ServiceEntity> serviceEntities = serviceRepository.findAll();
		List<ServiceResponse> dtos = new ArrayList<>();
		for (ServiceEntity s : serviceEntities)
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
		validator.validateVarchar(name, EntitiesConstraints.ITEM_NAME_MIN_LENGTH,
				EntitiesConstraints.ITEM_NAME_MAX_LENGTH, errorBuilder, "name");
	}

	private void validateDescription(String description, StringBuilder errorBuilder) {
		validator.validateVarchar(description, 1,
				EntitiesConstraints.DESCRIPTION_MAX_LENGTH, errorBuilder, "description");
	}

	


	@Override
	public ServiceResponse registerService(ServiceRequest serviceDto) {
		validateNewServiceRequest(serviceDto);
		validateNewServiceDbConflicts(serviceDto);
		ServiceEntity serviceEntity = dtoFactory.CreateEntityForInsertNewRecord(serviceDto);
		serviceEntity = serviceRepository.save(serviceEntity);
		return dtoFactory.createResponse(serviceEntity);
	}

	@Override
	public ServiceResponse get(int id) {
		ServiceEntity serviceEntity = validator.completeValidationForId(id, serviceRepository);
		return dtoFactory.createResponse(serviceEntity);
	}

	public ServiceEntity getServiceById(Integer id) {
		return validator.completeValidationForId(id, serviceRepository);
	}

	@Override
	public ServiceResponse update(int id, UpdateServiceRequest serviceDto) throws InvalidIdFormatException {
		ServiceEntity serviceEntity = validateUpdateRequest(id, serviceDto);
		serviceEntity = serviceRepository.save(serviceEntity);
		return dtoFactory.createResponse(serviceEntity);
	}

	@Override
	public ServiceResponse delete(int id) throws InvalidIdFormatException {
		ServiceEntity serviceEntity = validator.validateSoftDeletableEntityExistence(id, serviceRepository);
		//serviceEntity.getTaxes().clear();
		// List<Taxs> taxs = service.getTaxs();
		// if (taxs.size() > 0) {
		// 	service.setEnabled(false);
		// 	serviceRepository.save(service);
		// } else
			serviceRepository.delete(serviceEntity);
		return dtoFactory.createResponse(serviceEntity);
	}

	@Override
	public List<ServiceResponse> get() throws InvalidIdFormatException {
		List<ServiceEntity> serviceEntities = serviceRepository.findAll();
		List<ServiceResponse> dtos = new ArrayList<>();
		for (ServiceEntity s : serviceEntities)
			dtos.add(dtoFactory.createResponse(s));
		if (dtos.isEmpty())
			throw new EmptyTableException("There aren't registered services.");
		return dtos;
	}}
