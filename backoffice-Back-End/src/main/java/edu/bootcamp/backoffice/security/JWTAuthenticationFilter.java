package edu.bootcamp.backoffice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JWTGenerator jwtGenerator;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private TokenBlacklist tokenBlacklist;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getJWTFromRequest(request);
        if (StringUtils.hasText(token) && jwtGenerator.validateToken(token)){
            String username = jwtGenerator.getUsernameFromJWT(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, "jwt-password", userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            //tokenBlacklist.addToBlacklist(token, new Date().getTime() + SecurityConstants.JWT_EXPIRATION_TIME);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            response.setHeader("Authorization","Bearer "+jwtGenerator.generateToken(authentication));
        }
        filterChain.doFilter(request,response);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
//        if (StringUtils.hasText(bearerToken)){
            return bearerToken.split(" ")[1];
        }
        return null;
    }
}
