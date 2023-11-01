package edu.bootcamp.backoffice.model.Tax.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UpdateChargeRequest {
    @JsonProperty("name")
    private String name;

    @JsonProperty("percentage")
    private Integer percentage;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("id")
    private Integer id;
}
