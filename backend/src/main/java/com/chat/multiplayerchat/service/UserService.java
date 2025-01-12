package com.chat.multiplayerchat.service;

import com.chat.multiplayerchat.dto.LoginDto;
import com.chat.multiplayerchat.entity.User;
import org.springframework.security.core.Authentication;

public interface UserService {

    void createDefaultUsers();

    User loadCustomUserByUsername(String username);

    boolean validateUserCredentials(LoginDto loginDto, Authentication authenticate);

    String generateJwtToken(String username);
}
