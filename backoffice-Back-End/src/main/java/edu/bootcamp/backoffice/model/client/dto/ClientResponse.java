package edu.bootcamp.backoffice.model.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientResponse {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("enabled")
  private Boolean enabled;

}