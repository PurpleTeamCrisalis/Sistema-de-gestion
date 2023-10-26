package edu.bootcamp.backoffice.model.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderRequest {
  @JsonProperty("clientId")
  private Integer clientId;

  @JsonProperty("userId")
  private Integer userId;
}