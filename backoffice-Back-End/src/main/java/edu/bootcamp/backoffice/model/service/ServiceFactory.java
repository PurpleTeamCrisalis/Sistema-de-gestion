package edu.bootcamp.backoffice.model.service;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;

@Component
public class ServiceFactory {

	public Service CreateServiceEntity(String name, String description, double basePrice, boolean isSpecial,
			double suportCharge) {

		return Service.builder().name(name).description(description).basePrice(basePrice).isSpecial(isSpecial)
				.suportCharge(suportCharge).enabled(true).build();
	}

	public Service CreateEntityForInsertNewRecord(ServiceRequest servicetDto) {

		return Service.builder().name(servicetDto.getName()).description(servicetDto.getDescription())
				.basePrice(servicetDto.getBasePrice()).isSpecial(servicetDto.isSpecial())
				.suportCharge(servicetDto.getSuportCharge()).enabled(true).build();

	}

	public ServiceResponse createResponse(Service service) {

		return ServiceResponse.builder().name(service.getName()).description(service.getDescription())
				.basePrice(service.getBasePrice()).isSpecial(service.isSpecial())
				.suportCharge(service.getSuportCharge()).enabled(service.isEnabled()).build();
	}

}
