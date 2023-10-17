package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping(
            path = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserResponse> registerUser(
            @RequestBody UserRequest createRequest
        )
    {
        UserResponse userDto = userService.registerUser(createRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(userDto.getId())
                .toUri();
        return ResponseEntity.created(location).body(userDto);
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserResponse> getUser(@PathVariable int id)
    {
        UserResponse user = userService.get(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping(
            path = "/list",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<UserResponse>> getAllUsers()
    {
        List<UserResponse> users = userService.get();
        return ResponseEntity.ok(users);
    }

    @PatchMapping(
            path = "update/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable int id,
            @RequestBody UserRequest userDTO)
    {
        UserResponse user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(
            value = "delete/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserResponse> deleteUser(@PathVariable int id)
    {
        UserResponse user = userService.delete(id);
        return ResponseEntity.ok(user);
    }
}
