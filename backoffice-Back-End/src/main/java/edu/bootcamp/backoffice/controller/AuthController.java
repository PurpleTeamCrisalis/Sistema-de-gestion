package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.dto.AuthResponseDTO;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.security.JWTGenerator;
import edu.bootcamp.backoffice.service.AuthService;
import edu.bootcamp.backoffice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(path="/auth")
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;

    private final AuthService authService;

    public AuthController(PasswordEncoder passwordEncoder, UserService userService, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator, AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
        this. authService = authService;
    }

    @PostMapping(path="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO){

        if (userService.isUserPresent(userDTO)){
            return new ResponseEntity<>("User logged in successfully",authService.authenticateAndReturnHeader(userDTO), HttpStatus.OK);
        }
        return new ResponseEntity<>("Credentials do not correspond to a valid user", HttpStatus.NOT_FOUND);
    }
    @GetMapping(path="/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("User logged out successfully",HttpStatus.OK);
    }
}
