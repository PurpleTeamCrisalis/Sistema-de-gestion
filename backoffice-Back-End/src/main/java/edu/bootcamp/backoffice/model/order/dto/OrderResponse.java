package edu.bootcamp.backoffice.model.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderResponse {
  @JsonProperty("id")
  private Integer id;
  @JsonProperty("name")
  private String name;
}