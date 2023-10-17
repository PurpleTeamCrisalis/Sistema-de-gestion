package edu.bootcamp.backoffice.service.user;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.UserConstraints;
import edu.bootcamp.backoffice.model.user.UserDtoFactory;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.service.Interface.UserService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService
{
    private final UserRepository userRepository;
    private final UserDtoFactory dtoFactory;
    private final Validator validator;

    public UserServiceImpl(
            UserRepository userRepository,
            UserDtoFactory dtoFactory,
            Validator validator
        )
    {
        this.userRepository = userRepository;
        this.dtoFactory = dtoFactory;
        this.validator = validator;
    }

    public UserResponse registerUser(UserRequest userRequest)
    {
        validateCredentials(
                userRequest.getUsername(),
                userRequest.getPassword(),
                new StringBuilder()
        );
        validateNewUserDbConflicts(userRequest);
        User user = dtoFactory.CreateEntityForInsertNewRecord(userRequest);
        user = userRepository.save(user);
        return dtoFactory.createResponse(user);
    }

    public UserResponse update(int id, UserRequest userRequest)
    {
        StringBuilder errorBuilder = new StringBuilder();
        validator.validateIdFormat(id, errorBuilder);
        validateCredentials(
                userRequest.getUsername(),
                userRequest.getPassword(),
                errorBuilder
        );
        User user = validateUpdateConflicts(id, userRequest);
        user = dtoFactory.createEntity(
                id,
                userRequest,
                user.isNotDeleted()
        );
        user = userRepository.save(user);
        return dtoFactory.createResponse(user);
    }

    public UserResponse get(int id)
    {
        User user = validator.validateSoftDeletableEntityExistence(
                id,
                userRepository
        );
        return dtoFactory.createResponse(user);
    }

    public List<UserResponse> get()
    {
        List<User> users = userRepository.findAll();
        List<UserResponse> dtos = new ArrayList<>();
        for (User user : users)
            if(user.isNotDeleted())
                dtos.add(dtoFactory.createResponse(user));
        if(dtos.isEmpty())
            throw new EmptyTableException(
                    "There aren't registered users."
            );
        return dtos;
    }

    public UserResponse delete(int id)
    {
        User user = validator.validateSoftDeletableEntityExistence(
                id,
                userRepository
        );
        List<Order> orders = user.getProcessedOrders();
        if(orders.size() > 0)
        {
            user.setEnabled(false);
            userRepository.save(user);
        } else
            userRepository.delete(user);
        return dtoFactory.createResponse(user);
    }

    private void validateNewUserDbConflicts(
            UserRequest userRequest
        )
    {
        Optional<User> result = userRepository.findByUsername(
                userRequest.getUsername()
        );
        if(result.isPresent())
            throw new AlreadyRegisteredException(
                    "Username not available."
            );
    }

    private User validateUpdateConflicts(int requestedId, UserRequest userDto)
    {
        Optional<User> result = userRepository
                .findByUsername(userDto.getUsername());
        User user;
        if(result.isPresent())
        {
            if(result.get().isDeleted())
                throw new DeletedAccountUpdateException("");
            user = result.get();
            resolveSameUsername(user, requestedId, userDto);
        } else
            user = validator.validateSoftDeletableEntityExistence(
                    requestedId,
                    userRepository
            );
        return user;
    }

    private void resolveSameUsername(
            User user,
            int requestedId,
            UserRequest userDto
        )
    {
        if(user.getId() != requestedId)
            throw new AlreadyRegisteredException(
                    "Username not available"
            );
        String userPassword = user.getPassword();
        if (userDto.getPassword().equals(userPassword))
            throw new AlreadyUpdatedException(
                    "Not modified database."
            );
    }

    public void validateCredentials(
            String username,
            String password,
            StringBuilder errorBuilder
        )
    {
        validateUsername(username, errorBuilder);
        validatePassword(password, errorBuilder);
        if(errorBuilder.length() != 0)
            throw new InvalidArgumentsFormatException(
                errorBuilder.toString()
            );
    }

    public void validateUsername(
            String username,
            StringBuilder errorBuilder
        )
    {
        validator.validateVarchar(
                username,
                UserConstraints.USERNAME_MIN_LENGTH,
                UserConstraints.USERNAME_MAX_LENGTH,
                errorBuilder,
                "Username"
        );
    }

    public void validatePassword(
            String password,
            StringBuilder errorBuilder
        )
    {
        validator.validateVarchar(
                password,
                UserConstraints.PASSWORD_MIN_LENGTH,
                UserConstraints.PASSWORD_MAX_LENGTH,
                errorBuilder,
                "Password"
        );
    }
}