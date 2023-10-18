package edu.bootcamp.backoffice.service.user;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.user.User;
import edu.bootcamp.backoffice.model.user.UserConstraints;
import edu.bootcamp.backoffice.model.user.UserFactory;
import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.service.Interface.UserService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService
{
    private final UserRepository userRepository;
    private final UserFactory dtoFactory;
    private final Validator validator;
    private  final PasswordEncoder encoder;

    public UserServiceImpl(
            UserRepository userRepository,
            UserFactory dtoFactory,
            Validator validator,
            PasswordEncoder encoder
        )
    {
        this.userRepository = userRepository;
        this.dtoFactory = dtoFactory;
        this.validator = validator;
        this.encoder = encoder;
    }

    public boolean isUserPresent(UserRequest userDto){
        StringBuilder errors = new StringBuilder();
        validateUsername(userDto.getUsername(), errors);
        if(errors.length() > 0)
            throw new InvalidCredentialsException("Invalid username");
        Optional<User> result =  userRepository
                .findByUsername(userDto.getUsername());
        if(result.isPresent())
            return true;//return ! result.get().isDeleted();
        return false;
    }

    public UserResponse registerUser(UserRequest userRequest)
    {
        validateNewUserRequest(userRequest);
        String password = encoder.encode(userRequest.getPassword());
        userRequest.setPassword(password);
        validateNewUserDbConflicts(userRequest);
        User user = dtoFactory.CreateEntityForInsertNewRecord(userRequest);
        user = userRepository.save(user);
        return dtoFactory.createResponse(user);
    }

    private void validateNewUserRequest(UserRequest userRequest)
    {
        StringBuilder errors = new StringBuilder();
        validateUsername(userRequest.getUsername(),errors);
        validatePassword(userRequest.getPassword(),errors);
        validateErrors(errors);
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

    public UserResponse update(int id, UpdateUserRequest userRequest)
    {
        validateUpdateRequest(id, userRequest);
        User user = validateUpdateConflicts(id, userRequest);
        user = userRepository.save(user);
        return dtoFactory.createResponse(user);
    }

    private void validateUpdateRequest(
            int id,
            UpdateUserRequest userRequest
        )
    {
        StringBuilder errors = new StringBuilder();
        validator.validateIdFormat(id, errors);
        if(userRequest.getUsername() != null)
            validateUsername(userRequest.getUsername(), errors);
        if(userRequest.getPassword() != null)
            validatePassword(userRequest.getPassword(), errors);
        validateErrors(errors);
    }

    private User validateUpdateConflicts(
            int id,
            UpdateUserRequest userDto
        )
    {
        Optional<User> result = userRepository
                .findByUsername(userDto.getUsername());
        User user;
        boolean modified = ! result.isPresent();
        if(modified)
            user = findAndSetUsernameIfNotNull(id, userDto.getUsername());
        else
            user = validateEnabledUserSearchResult(result, id);
        modified |= mergeEnabled(userDto, user);
        modified |= mergePassword(userDto, user);
        if( ! modified )
            throw new AlreadyUpdatedException(
                    "Not modified database."
            );
        return user;
    }

    private User validateEnabledUserSearchResult(
            Optional<User> result,
            int requesteId
        )
    {
        User user = result.get();
        /* Si se decide evitar dar alta logica :
        if(user.isDeleted())
            throw new DeletedAccountUpdateException("");*/
        if(user.getId() != requesteId)
            throw new AlreadyRegisteredException(
                    "Username not available"
            );
        return user;
    }

    private User findAndSetUsernameIfNotNull(int id, String username)
    {
        User user = validator.completeValidationForId(
                id,
                userRepository
        );
        if(username != null)
            user.setUsername(username);
        return user;
    }

    private boolean mergePassword(UpdateUserRequest userDto, User user)
    {
        String dtoPassword = userDto.getPassword();
        String userPassword = user.getPassword();
        if(dtoPassword!=null && ! userPassword.equals(dtoPassword))
        {
            String hashedPassword = encoder.encode(dtoPassword);
            user.setPassword(hashedPassword);
            return true;
        }
        return false;
    }

    private boolean mergeEnabled(UpdateUserRequest userDto, User user)
    {
        Boolean dtoEnabled = userDto.getEnabled();
        Boolean userEnabled = user.isEnabled();
        if(dtoEnabled != null && !userEnabled.equals(dtoEnabled))
        {
            user.setEnabled(userDto.getEnabled());
            return true;
        }
        return false;
    }

    public UserResponse get(int id)
    {
        User user = validator.completeValidationForId(
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

    private void validateErrors(StringBuilder errors)
    {
        if(errors.length() != 0)
            throw new InvalidArgumentsFormatException(
                    errors.toString()
            );
    }

    private void validateUsername(
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

    private void validatePassword(
            String password,
            StringBuilder errorBuilder
        ) {
        validator.validateVarchar(
                password,
                UserConstraints.PASSWORD_MIN_LENGTH,
                UserConstraints.PASSWORD_MAX_LENGTH,
                errorBuilder,
                "Password"
        );
    }
}