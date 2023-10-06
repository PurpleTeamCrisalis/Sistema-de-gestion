package edu.bootcamp.backoffice.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreatUserRequestDTO {

    @JsonProperty("username")
    private String username;
    @JsonProperty("password")
    private String password;

}