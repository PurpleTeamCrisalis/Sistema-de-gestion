package edu.bootcamp.backoffice.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;

@Component
public class ServiceFactory {

	private final TaxFactory taxFactory;

	public ServiceFactory(TaxFactory taxFactory) {

		this.taxFactory = taxFactory;
	}

	public ServiceEntity CreateServiceEntity(String name, String description, double basePrice, boolean isSpecial,
			double suportCharge, List<Tax> taxes) {

		return ServiceEntity.builder().name(name).description(description).basePrice(basePrice).isSpecial(isSpecial)
				.suportCharge(suportCharge).taxes(taxes).enabled(true).build();
	}

	public ServiceEntity CreateEntityForInsertNewRecord(ServiceRequest serviceDto) {

		return ServiceEntity.builder().name(serviceDto.getName()).description(serviceDto.getDescription())
				.basePrice(serviceDto.getBasePrice()).isSpecial(serviceDto.isSpecial())
				.taxes(createTaxResponses(serviceDto.getTaxes())).suportCharge(serviceDto.getSuportCharge())
				.enabled(true).build();

	}

	private List<Tax> createTaxResponses(List<ChargeRequest> listResponse)

	{
		List<Tax> listTaxes = new ArrayList<Tax>();

		for (ChargeRequest chargeRequest : listResponse) {
			Tax tax = taxFactory.CreateEntityForInsertNewRecord(chargeRequest);
			listTaxes.add(tax);
		}

		return listTaxes;
	}

	public ServiceResponse createResponse(ServiceEntity serviceEntity, List<ChargeResponse> taxes) {

		return ServiceResponse.builder().id(serviceEntity.getId()).name(serviceEntity.getName())
				.description(serviceEntity.getDescription()).basePrice(serviceEntity.getBasePrice())
				.isSpecial(serviceEntity.isSpecial()).suportCharge(serviceEntity.getSuportCharge()).taxes(taxes)
				.enabled(serviceEntity.isEnabled()).build();
	}

	public ServiceResponse createServiceResponse(ServiceEntity serviceEntity) {
		List<ChargeResponse> chargeResponse = createChargeResponses(serviceEntity.getTaxes());
		return createResponse(serviceEntity, chargeResponse);
	}

	private List<ChargeResponse> createChargeResponses(List<Tax> taxes) {
		List<ChargeResponse> chargeResponses = new ArrayList<ChargeResponse>();
		for (Tax t : taxes) {
			ChargeResponse chargeResponse = taxFactory.createResponse(t);
			chargeResponses.add(chargeResponse);
		}
		return chargeResponses;
	}

}
