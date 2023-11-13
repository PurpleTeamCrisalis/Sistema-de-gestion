package edu.bootcamp.backoffice.model.product;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.orderDetail.productDetail.dto.ProductDetailResponse;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.dto.ServiceDetailResponse;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;

@Component
public class ProductFactory {
	private final TaxFactory taxFactory;

	public ProductFactory(TaxFactory taxFactory) {

		this.taxFactory = taxFactory;
	}

	public Product CreateProductEntity(String name, String description, double basePrice, List<Tax> taxes) {

		return Product.builder().name(name).description(description).basePrice(basePrice).taxes(taxes).enabled(true)
				.build();
	}

	public Product CreateEntityForInsertNewRecord(ProductRequest productDto) {

		return Product.builder().name(productDto.getName()).description(productDto.getDescription())
				.basePrice(productDto.getBasePrice()).taxes(createTaxResponses(productDto.getTaxes())).enabled(true)
				.build();

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

	public ProductResponse createResponse(Product product, List<ChargeResponse> taxes) {

		return ProductResponse.builder().id(product.getId()).name(product.getName())
				.description(product.getDescription()).basePrice(product.getBasePrice()).taxes(taxes)
				.enabled(product.isEnabled()).build();
	}

	public ProductResponse createProductResponse(Product product) {
		List<ChargeResponse> chargeResponse = createChargeResponses(product.getTaxes());
		return createResponse(product, chargeResponse);
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