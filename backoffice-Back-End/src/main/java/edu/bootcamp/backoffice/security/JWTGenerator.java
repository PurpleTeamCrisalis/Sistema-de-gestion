package edu.bootcamp.backoffice.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTGenerator {
    private final TokenBlacklist tokenBlacklist;

    @Autowired
    public JWTGenerator(TokenBlacklist tokenBlacklist) {
        this.tokenBlacklist = tokenBlacklist;
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET)
                .compact();
    }

    public static String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SecurityConstants.JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token);
            if (tokenBlacklist.isTokenBlacklisted(token)) {
                throw new ExpiredJwtException(null, null, "Token is blacklisted");
            }
            return true;
        } catch (ExpiredJwtException ex) {
            throw ex; // O podrías manejar la excepción aquí, por ejemplo, lanzando una excepción diferente para token expirado
        } catch (MalformedJwtException ex) {
            throw ex; // O manejar la excepción aquí, por ejemplo, lanzando una excepción diferente para token mal formado
        } catch (SignatureException ex) {
            throw ex; // O manejar la excepción aquí, por ejemplo, lanzando una excepción diferente para firma incorrecta
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT expired or incorrect");
        }
    }
}
