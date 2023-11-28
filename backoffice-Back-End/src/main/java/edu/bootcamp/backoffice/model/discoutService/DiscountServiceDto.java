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
    @JsonProperty("clientid")
    private Integer clientId;

    @JsonProperty("clientname")
    private String clientName;

    @JsonProperty("clientlastname")
    private String lastName;

    @JsonProperty("clientdni")
    private Integer dni;

    @JsonProperty("clientphone")
    private Long phone;

    @JsonProperty("clientadress")
    private String adress;

    @JsonProperty("clientbussinessname")
    private String bussinessName;

    @JsonProperty("serviceid")
    private Integer serviceId;

    @JsonProperty("servicename")
    private String serviceName;

    @JsonProperty("servicedescription")
    private String description;

    @JsonProperty("servicebaseprice")
    private double basePrice;

    @JsonProperty("serviceisspecial")
    private Boolean isSpecial;

    @JsonProperty("servicesuportcharge")
    private double suportCharge;

    @JsonProperty("serviceenabled")
    private Boolean serviceEnabled;

    @JsonProperty("orderdate")
    private Date orderDate;

    @JsonProperty("totaldiscount")
    private Double totalDiscount;
}
