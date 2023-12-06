package edu.bootcamp.backoffice.model.discoutService;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountServiceDto {
    @JsonProperty("clientname")
    private String clientName;

    @JsonProperty("clientlastname")
    private String clientLastName;

    @JsonProperty("isbussiness")
    private String isBussiness;

    @JsonProperty("bussinessname")
    private String bussinessName;

    @JsonProperty("servicename")
    private String servicename;

    @JsonProperty("orderdate")
    private Date orderDate;

    @JsonProperty("totaldiscount")
    private Double totalDiscount;
}
