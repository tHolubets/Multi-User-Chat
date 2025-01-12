package com.chat.multiplayerchat.dto;

import com.chat.multiplayerchat.entity.User;

public record CustomUserDto(Long userId, String username) {

    public CustomUserDto(User user) {
        this(user.getId(), user.getUsername());
    }
}
