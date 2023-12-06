package edu.bootcamp.backoffice.security;

import edu.bootcamp.backoffice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        edu.bootcamp.backoffice.model.user.User user = userRepository
                .findByUsername(username)
                .orElseThrow(
                        ()-> new UsernameNotFoundException("Username not found")
                );
        return new User(
                user.getUsername(),
                user.getPassword(),
                AuthorityUtils.createAuthorityList("ADMIN")
        );
    }

}
