package edu.bootcamp.backoffice.model.service;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;

@Component
public class ServiceFactory {

	public ServiceEntity CreateServiceEntity(String name, String description, double basePrice, boolean isSpecial,
                                             double suportCharge) {

		return ServiceEntity.builder().name(name).description(description).basePrice(basePrice).isSpecial(isSpecial)
				.suportCharge(suportCharge).enabled(true).build();
	}

	public ServiceEntity CreateEntityForInsertNewRecord(ServiceRequest servicetDto) {

		return ServiceEntity.builder().name(servicetDto.getName()).description(servicetDto.getDescription())
				.basePrice(servicetDto.getBasePrice())/*.isSpecial(servicetDto.isSpecial())
				.suportCharge(servicetDto.getSuportCharge())*/.enabled(true).build();

	}

	public ServiceResponse createResponse(ServiceEntity serviceEntity) {

		return ServiceResponse.builder().id(serviceEntity.getId()).name(serviceEntity.getName()).description(serviceEntity.getDescription())
				.basePrice(serviceEntity.getBasePrice())/*.isSpecial(serviceEntity.isSpecial())
				.suportCharge(serviceEntity.getSuportCharge())*/.enabled(serviceEntity.isEnabled()).build();
	}

}
