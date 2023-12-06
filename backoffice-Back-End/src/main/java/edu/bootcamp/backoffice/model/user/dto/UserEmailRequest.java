package edu.bootcamp.backoffice.model.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEmailRequest {
    @JsonProperty("email")
    private String email;
}
