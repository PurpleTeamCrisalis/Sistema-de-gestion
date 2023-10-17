package edu.bootcamp.backoffice.model.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserRequest
{
    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;
}