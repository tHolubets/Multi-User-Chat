package com.chat.multiplayerchat.controller;

import com.chat.multiplayerchat.dto.AuthResponseDto;
import com.chat.multiplayerchat.dto.LoginDto;
import com.chat.multiplayerchat.entity.User;
import com.chat.multiplayerchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        //temp solution to work without sql init script
        try {
            User user = userService.loadCustomUserByUsername("system");
        } catch (UsernameNotFoundException ex) {
            userService.createDefaultUsers();
        }

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.username(), loginDto.password()));
        if (userService.validateUserCredentials(loginDto, authenticate)) {
            String token = userService.generateJwtToken(loginDto.username());
            return ResponseEntity.ok(new AuthResponseDto(loginDto.username(), token));
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/add-default-users")
    public ResponseEntity<String> addDefaultUsers() {
        userService.createDefaultUsers();
        return ResponseEntity.status(200).body("Users added successfully");
    }
}