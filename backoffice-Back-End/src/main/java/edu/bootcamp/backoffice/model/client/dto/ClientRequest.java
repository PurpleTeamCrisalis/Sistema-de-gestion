package edu.bootcamp.backoffice.model.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientRequest {

  @JsonProperty("name")
  private String name;

  @JsonProperty("lastName")
  private String lastName;

  @JsonProperty("dni")
  private Integer dni;

  @JsonProperty("phone")
  private Long phone;

  @JsonProperty("adress")
  private String adress;

  @JsonProperty("isBussiness")
  private Boolean isBussiness;

  @JsonProperty("bussinessName")
  private String bussinessName;

  @JsonProperty("StartDate")
  private Date startDate;

  @JsonProperty("cuit")
  private Long cuit;

}
