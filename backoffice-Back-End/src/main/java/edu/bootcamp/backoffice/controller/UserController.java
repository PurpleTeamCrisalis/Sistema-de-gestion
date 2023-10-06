package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.dto.CreatUserRequestDTO;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    @PostMapping(
            value = "",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserDTO> saveUser(
            @RequestBody CreatUserRequestDTO userDTO
    )
    {
        UserDTO user = new UserDTO(
                userDTO.getUsername(),
                userDTO.getPassword(),
                1
        );
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getUserId())
                .toUri();
        return ResponseEntity.created(location).body(user);
        //return this.userService.saveUser(userDTO);
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserDTO> getUser(@PathVariable int id)
    {
        UserDTO user = new UserDTO(
                "unUsername",
                "unPass",
                id
        );
        return ResponseEntity.ok(user);
        //throw new UnsupportedOperationException("endpoint getUser no implementado");
    }

    @GetMapping(
            value = "",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<UserDTO>> getAllUsers()
    {
        int id = 1;
        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(new UserDTO(
                "user"+id,
                "pass"+id,
                id++
        ));
        users.add(new UserDTO(
                "user"+id,
                "pass"+id,
                id
        ));
        return ResponseEntity.ok(users);
        //return this.userService.getListAllUsersInBD();
    }

    @PutMapping(
            value = "",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO)
    {
        UserDTO user = new UserDTO(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getUserId()
        );
        return ResponseEntity.ok(user);
        //throw new UnsupportedOperationException("endpoint updateUser no implementado");
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteUser(@PathVariable int id)
    {
        UserDTO user = new UserDTO(
                "unUsername",
                "unPass",
                id
        );
        return ResponseEntity.noContent().build();
        //throw new UnsupportedOperationException("endpoint deleteUser no implementado");
    }

    /*
    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO loginUser(@RequestParam String username, @RequestParam String password){
        return this.userService.loginUserWithCredentials(username, password);
    }
    */
}
