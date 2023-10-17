package edu.bootcamp.backoffice.security;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenBlacklist {
    private final Map<String, Long> blacklist = new ConcurrentHashMap<>();

    public void addToBlacklist(String token, Long expirationTime) {
        blacklist.put(token, expirationTime);
    }
    public boolean isTokenBlacklisted(String token) {
        this.refreshBlacklist();
        return blacklist.containsKey(token);
    }

    private void refreshBlacklist() {
        long currentTime = new Date().getTime();
        blacklist.entrySet().removeIf(entry -> entry.getValue() <= currentTime);
    }

    //por si se llega a necesitar
    public void removeFromBlacklist(String token) {
        blacklist.remove(token);
    }
}
