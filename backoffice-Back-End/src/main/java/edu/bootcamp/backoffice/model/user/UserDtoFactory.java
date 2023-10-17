package edu.bootcamp.backoffice.model.user;

import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserDtoFactory
{
    public User createEntity(
            int id,
            UserRequest userDTO,
            Boolean enabled
        )
    {
        return User
                .builder()
                .id(id)
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .enabled(enabled)
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
            .password(user.getPassword())
            .id(user.getId())
            .build();
    }
}