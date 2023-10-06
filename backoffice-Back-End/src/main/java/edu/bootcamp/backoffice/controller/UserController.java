package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.dto.CreatUserRequestDTO;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    //private final UserService userService;

    public UserController(UserService userService)
    {
        //this.userService = userService;
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO saveUser(@RequestBody CreatUserRequestDTO userDTO)
    {
        return new UserDTO(
                userDTO.getUsername(),
                userDTO.getPassword(),
                1
        );
        //return this.userService.saveUser(userDTO);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO getUser(@PathVariable int id)
    {
        return new UserDTO("unUsername","unPass",id);
        //throw new UnsupportedOperationException("endpoint getUser no implementado");
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserDTO> getAllUsers()
    {
        int id = 1;
        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(new UserDTO("user"+id,"pass"+id, id++));
        users.add(new UserDTO("user"+id,"pass"+id, id++));
        return users;
        //return this.userService.getListAllUsersInBD();
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO updateUser(@RequestBody UserDTO userDTO)
    {
        return new UserDTO(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getUserId());
        //throw new UnsupportedOperationException("endpoint updateUser no implementado");
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO deleteUser(@PathVariable int id)
    {
        return new UserDTO("unUsername","unPass",id);
        //throw new UnsupportedOperationException("endpoint deleteUser no implementado");
    }

    /*
    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO loginUser(@RequestParam String username, @RequestParam String password){
        return this.userService.loginUserWithCredentials(username, password);
    }
    */
}
