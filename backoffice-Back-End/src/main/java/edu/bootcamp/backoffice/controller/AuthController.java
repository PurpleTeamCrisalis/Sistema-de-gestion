package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.dto.AuthResponseDTO;
import edu.bootcamp.backoffice.model.dto.UserDTO;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.security.JWTGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/auth")
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;

    public AuthController(PasswordEncoder passwordEncoder, UserRepository userRepository, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping(path="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponseDTO> login(@RequestBody UserDTO userDTO){

        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()){
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
        }
        return new ResponseEntity<>(new AuthResponseDTO(null), HttpStatus.NOT_FOUND);
    }
}
