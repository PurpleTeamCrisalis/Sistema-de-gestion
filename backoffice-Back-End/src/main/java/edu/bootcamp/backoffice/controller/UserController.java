package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.User;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO saveUser(@RequestBody UserDTO userDTO)
    {
        return new UserDTO("unUser","unPass","unName");
        //return this.userService.saveUser(userDTO);
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserDTO> getAllUser()
    {
        return this.userService.getListAllUsersInBD();
    }

    @GetMapping(value = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO getUser(@RequestParam int id)
    {
        return new UserDTO("unUser","unPass","unName");
        //throw new UnsupportedOperationException("endpoint getUser no implementado");
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO updateUser(@RequestBody UserDTO userDTO)
    {
        return new UserDTO("unUser","unPass","unName");
        //throw new UnsupportedOperationException("endpoint updateUser no implementado");
    }

    @DeleteMapping(value = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO deleteUser(@RequestBody int id)
    {
        return new UserDTO("unUser","unPass","unName");
        //throw new UnsupportedOperationException("endpoint deleteUser no implementado");
    }

    /*
    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO loginUser(@RequestParam String username, @RequestParam String password){
        return this.userService.loginUserWithCredentials(username, password);
    }
    */
}
