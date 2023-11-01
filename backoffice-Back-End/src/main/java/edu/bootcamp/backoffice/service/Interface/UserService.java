package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;

import java.util.List;

public interface UserService
{
    public UserResponse registerUser(UserRequest userDto);

    public UserResponse get(int id);

    public List<UserResponse> get()
            throws InvalidIdFormatException;

    public UserResponse update(int id, UpdateUserRequest userDto)
            throws InvalidIdFormatException;

    public UserResponse delete(int id)
            throws InvalidIdFormatException;



    //For Login


    public boolean isUserPresent(UserRequest userDTO);
    public boolean isUserPresent(String email);

    void changePasswordByEmail(String email);
}