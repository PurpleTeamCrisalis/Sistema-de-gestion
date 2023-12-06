package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.service.ServiceEntity;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.model.service.dto.UpdateServiceRequest;

public interface ServiceService {
	public ServiceResponse registerService(ServiceRequest serviceDto);

	public ServiceResponse get(int id);

	public List<ServiceResponse> get() throws InvalidIdFormatException;

	public ServiceResponse update(int id, UpdateServiceRequest productDto) throws InvalidIdFormatException;

	public ServiceResponse delete(int id) throws InvalidIdFormatException;

	public ServiceEntity getServiceById(
			Integer id,
			StringBuilder errorBuilder
	);
}
