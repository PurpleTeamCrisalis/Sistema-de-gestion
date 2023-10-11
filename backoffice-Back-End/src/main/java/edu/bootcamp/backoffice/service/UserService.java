package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.exception.custom.EmptyElementException;
import edu.bootcamp.backoffice.exception.custom.NotCreatedException;
import edu.bootcamp.backoffice.exception.custom.UnauthorizedException;
import edu.bootcamp.backoffice.model.User;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User saveUser(UserDTO userDTO){
        if(checkUserDTO(userDTO, Boolean.FALSE)){
            return this.userRepository.save(new User(userDTO));
        }
        throw new NotCreatedException("Error in save new User");
    }

    public UserDTO loginUserWithCredentials(String username, String password){
        if(
                this.checkUserDTO(UserDTO
                            .builder()
                                .username(username)
                                .password(password)
                                .build()
                        , Boolean.TRUE)
        ){
            return this.userRepository.findByUsernameAndPassword(username,password)
                    .orElseThrow(
                            () -> new UnauthorizedException("Invalid credentials")
                    ).toDTO();
        }
        throw  new UnauthorizedException("Invalid credentials");
    }

    private Boolean checkUserDTO(UserDTO userDTO, Boolean isForLogin){
        if(StringUtils.isEmpty(userDTO.getUsername())){
            throw new EmptyElementException("Username is empty");
        }
        if(StringUtils.isEmpty(userDTO.getPassword())){
            throw new EmptyElementException("Password is empty");
        }
        if(!isForLogin){
            if(StringUtils.isEmpty(userDTO.getName())){
                throw new EmptyElementException("Name is empty");
            }
        }

        return Boolean.TRUE;
    }

    public List<UserDTO> getListAllUsersInBD(){
        return this.userRepository
                .findAll()
                .stream()
                .map(User::toDTO)
                .collect(Collectors.toList());
    }

}
