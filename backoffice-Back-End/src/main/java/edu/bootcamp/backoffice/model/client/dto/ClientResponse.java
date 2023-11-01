package edu.bootcamp.backoffice.model.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientResponse {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("lastName")
    private String lastname;

    @JsonProperty("dni")
    private Integer dni;

    @JsonProperty("phone")
    private Long phone;

    @JsonProperty("adress")
    private String adress;

    @JsonProperty("startDate")
    private Date startdate;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("isBussiness")
    private Boolean isbussiness;

    @JsonProperty("bussinessName")
    private String bussinessname;

    @JsonProperty("cuit")
    private Long cuit;


}