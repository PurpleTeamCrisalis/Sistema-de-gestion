package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.user.dto.UserEmailRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.security.SecurityConstants;
import edu.bootcamp.backoffice.security.TokenBlacklist;
import edu.bootcamp.backoffice.service.AuthService;
import edu.bootcamp.backoffice.service.EmailService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping(path="/auth")
public class AuthController {

    private final UserService userService;
    private final TokenBlacklist tokenBlacklist;
    private final AuthService authService;


    public AuthController(UserService userService, AuthService authService,TokenBlacklist tokenBlacklist) {
        this.userService = userService;
        this. authService = authService;
        this.tokenBlacklist = tokenBlacklist;
    }

    @PostMapping(path="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserRequest userDTO){

        if (userService.isUserPresent(userDTO)){
            return new ResponseEntity<>("User logged in successfully",authService.authenticateAndReturnHeader(userDTO), HttpStatus.OK);
        }
        return new ResponseEntity<>("Credentials do not correspond to a valid user", HttpStatus.NOT_FOUND);
    }
    
    @GetMapping(path="/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
            tokenBlacklist.addToBlacklist(request.getHeader("Authorization"), new Date().getTime() + SecurityConstants.JWT_EXPIRATION_TIME);
        }
        return new ResponseEntity<>("User logged out successfully",HttpStatus.OK);
    }
    @PostMapping(path="/recover", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> passRecovery(@RequestBody UserEmailRequest userEmailRequest){
        String email = userEmailRequest.getEmail();
        if (!email.isBlank() && userService.isUserPresent(email)){
            userService.changePasswordByEmail(email);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Error: the email address is incorrect or does not correspond to a registered user",HttpStatus.CONFLICT);
    }
}
