package edu.bootcamp.backoffice.model.taxByOrder;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.Tax.TaxFactory;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.taxByOrder.dto.TaxByOrderResponse;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
public class TaxByOrderFactory
{
    private final TaxFactory taxFactory;

    public TaxByOrderFactory(TaxFactory taxFactory)
    {
        this.taxFactory = taxFactory;
    }
    public TaxByOrderResponse createResponse(TaxByOrder taxByOrder)
    {
        return TaxByOrderResponse
                .builder()
                .id(taxByOrder.getId())
                .tax(taxFactory.createResponse(taxByOrder.getTax()))
                .amount(taxByOrder.getAmount())
                .build();
    }
}
