package edu.bootcamp.backoffice.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.bootcamp.backoffice.model.Subscription.Subscription;
import edu.bootcamp.backoffice.model.Subscription.dto.SubscriptionResponse;
import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.service.dto.ServiceRequest;
import edu.bootcamp.backoffice.model.service.dto.ServiceResponse;
import edu.bootcamp.backoffice.repository.TaxRepository;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ServiceFactory {

    /*public ServiceFactory(SubscriptionFactory subscriptionFactory) {
        this.subscriptionFactory = subscriptionFactory;
    }*/

	private final TaxFactory taxFactory;
	private final TaxRepository taxRepository;

	public ServiceFactory(TaxFactory taxFactory, TaxRepository taxRepository) {
		this.taxRepository = taxRepository;
		this.taxFactory = taxFactory;
	}

    public ServiceEntity CreateServiceEntity(
			String name, String description, double basePrice, boolean isSpecial,
			double suportCharge) {

		return ServiceEntity.builder().name(name).description(description).basePrice(basePrice).isSpecial(isSpecial)
				.suportCharge(suportCharge).enabled(true).build();
	}

    public ServiceEntity CreateEntityForInsertNewRecord(ServiceRequest serviceDto) {

        return ServiceEntity.builder()
		.name(serviceDto.getName())
		.description(serviceDto.getDescription())
        .basePrice(serviceDto.getBasePrice())
		.isSpecial(serviceDto.isSpecial())
		.taxes(createTaxResponses(serviceDto.getTaxes()))
		.suportCharge(serviceDto.getSuportCharge())
		.enabled(true)
		.serviceSubscriptions(new ArrayList<>())
		.build();

	}

	public List<Tax> createTaxResponses(List<ChargeRequest> listResponse)
	{
		List<Tax> chargeResponses = new ArrayList<>();
		for (ChargeRequest chargeRequest : listResponse) {
			Optional<Tax> taxOptional = taxRepository.findByName(chargeRequest.getName());
			// Verificar si el impuesto existe antes de intentar agregarlo
			taxOptional.ifPresent(chargeResponses::add);
		}
    	return chargeResponses;
    }

    // public ServiceResponse createResponse(ServiceEntity serviceEntity) {
    //     List<SubscriptionResponse> subscriptionResponses = createSubscriptionsResponses(serviceEntity.getServiceSubscriptions());
    //     return ServiceResponse.builder()
	// 		.id(serviceEntity.getId())
	// 		.name(serviceEntity.getName())
	// 		.description(serviceEntity.getDescription())
    //         .basePrice(serviceEntity.getBasePrice())/*.isSpecial(serviceEntity.isSpecial())
	// 		.suportCharge(serviceEntity.getSuportCharge())*/
    //         .subscriptions(subscriptionResponses)
    //         .enabled(serviceEntity.isEnabled()).build();
    // }
	public ServiceResponse createResponse(ServiceEntity serviceEntity, List<ChargeResponse> taxes) {

		return ServiceResponse.builder().id(serviceEntity.getId()).name(serviceEntity.getName())
				.description(serviceEntity.getDescription()).basePrice(serviceEntity.getBasePrice())
				.isSpecial(serviceEntity.isSpecial()).suportCharge(serviceEntity.getSuportCharge())
				.taxes(taxes)
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

    public List<SubscriptionResponse> createSubscriptionsResponses(List<Subscription> subscription) {
        List<SubscriptionResponse> subscriptionResponses = new ArrayList<SubscriptionResponse>();
        SubscriptionResponse subsResponse = new SubscriptionResponse();
        if (subscription != null) {
            for (Subscription s : subscription) {

                subsResponse.setEnabled(s.isEnabled());
                subsResponse.setServiceName(s.getService().getName());
                subsResponse.setId(s.getId());

                subscriptionResponses.add(subsResponse);
            }
            return subscriptionResponses;
        }
        return subscriptionResponses;
    }
}
