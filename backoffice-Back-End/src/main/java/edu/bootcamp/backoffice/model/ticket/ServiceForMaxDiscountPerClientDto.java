package edu.bootcamp.backoffice.model.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Entity;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceForMaxDiscountPerClientDto {
    @JsonProperty("clientid")
    private Integer clientId;

    @JsonProperty("clientname")
    private String clientName;

    @JsonProperty("lastname")
    private String lastName;

    @JsonProperty("dni")
    private Integer dni;

    @JsonProperty("phone")
    private Long phone;

    @JsonProperty("adress")
    private String adress;

    @JsonProperty("startdate")
    private Date startDate;

    @JsonProperty("clientenabled")
    private Boolean clientEnabled;

    @JsonProperty("isbussiness")
    private Boolean isBussiness;

    @JsonProperty("bussinessname")
    private String bussinessName;

    @JsonProperty("cuit")
    private Long cuit;

    @JsonProperty("serviceid")
    private Integer serviceId;

    @JsonProperty("servicename")
    private String serviceName;

    @JsonProperty("description")
    private String description;

    @JsonProperty("baseprice")
    private double basePrice;

    @JsonProperty("isspecial")
    private Boolean isSpecial;

    @JsonProperty("suportcharge")
    private double suportCharge;

    @JsonProperty("serviceenabled")
    private Boolean serviceEnabled;

    @JsonProperty("orderdate")
    private Date orderDate;

    @JsonProperty("totaldiscount")
    private Double totalDiscount;
}
