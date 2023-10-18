package edu.bootcamp.backoffice.model.user;

import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

@Component
public class UserFactory
{
    public User CreateUserEntity(
            String username,
            String password
        )
    {
        return User
                .builder()
                .username(username)
                .password(password)
                .build();
    }

    public User CreateEntityForInsertNewRecord(UserRequest userDTO){
        return User
                .builder()
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .enabled(true)
                .build();
    }

    public UserResponse createResponse(User user){
        return UserResponse
            .builder()
            .username(user.getUsername())
            .enabled(user.isEnabled())
            .id(user.getId())
            .build();
    }
}