package edu.bootcamp.backoffice.model.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse
{
    @JsonProperty("username")
    private String username;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("id")
    private Integer id;
}