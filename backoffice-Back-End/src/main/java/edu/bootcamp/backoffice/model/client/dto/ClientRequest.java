package edu.bootcamp.backoffice.model.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientRequest {
    @JsonProperty("name")
    private String name;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("dni")
    private Integer dni;

    @JsonProperty("phone")
    private Long phone;

    @JsonProperty("adress")
    private String adress;

    @JsonProperty("startdate")
    private Date startdate;

    @JsonProperty("isbussiness")
    private Boolean isbussiness;

    @JsonProperty("bussinessname")
    private String bussinessname;

    @JsonProperty("cuit")
    private Long cuit;

}
