package com.chat.multiplayerchat.service;

import com.chat.multiplayerchat.dto.LoginDto;
import com.chat.multiplayerchat.entity.User;
import com.chat.multiplayerchat.entity.UserRole;
import com.chat.multiplayerchat.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration.time}")
    private Long EXPIRATION_TIME = 60_000L;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User loadCustomUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public boolean validateUserCredentials(LoginDto loginRequest, Authentication authenticate) {
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDetails userDetails = loadUserByUsername(loginRequest.username());
        return userDetails != null;
    }

    public String generateJwtToken(String username) {
        Long expirationTime = EXPIRATION_TIME;
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public void createDefaultUsers() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode("password");

        User userSystem = new User("System", "system", encodedPassword, UserRole.ROLE_USER);
        User user1 = new User("User 1", "user1", encodedPassword, UserRole.ROLE_USER);
        User user2 = new User("User 2", "user2", encodedPassword, UserRole.ROLE_USER);
        User user3 = new User("User 3", "user3", encodedPassword, UserRole.ROLE_USER);

        userRepository.saveAll(List.of(userSystem, user1, user2, user3));
    }
}
