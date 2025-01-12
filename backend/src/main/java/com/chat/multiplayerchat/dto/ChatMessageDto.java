package com.chat.multiplayerchat.dto;

import com.chat.multiplayerchat.entity.ChatMessage;
import com.chat.multiplayerchat.entity.User;

import java.time.LocalDateTime;

public record ChatMessageDto(Long id, String message, String dateTime, CustomUserDto userDto) {

    public ChatMessageDto(Long id, String message, LocalDateTime dateTime, User user) {
        this(id, message, dateTime.toString(), new CustomUserDto(user.getId(), user.getUsername()));
    }

    public ChatMessageDto(ChatMessage chatMessage) {
        this(chatMessage.getId(),
                chatMessage.getMessage(),
                chatMessage.getDateTime().toString(),
                new CustomUserDto(chatMessage.getAuthor())
        );
    }
}