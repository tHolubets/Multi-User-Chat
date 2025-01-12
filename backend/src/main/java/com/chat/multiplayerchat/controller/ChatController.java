package com.chat.multiplayerchat.controller;

import com.chat.multiplayerchat.dto.ChatMessageDto;
import com.chat.multiplayerchat.dto.MessageResponseDto;
import com.chat.multiplayerchat.entity.ChatMessage;
import com.chat.multiplayerchat.entity.User;
import com.chat.multiplayerchat.service.ChatMessageService;
import com.chat.multiplayerchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final UserService userService;

    @MessageMapping("/sendMessage")
    @SendTo("/chat/1")
    public ChatMessageDto sendMessage(String message, Principal principal) {
        User user = userService.loadCustomUserByUsername(principal.getName());
        var chatMessage = new ChatMessage(message, user, LocalDateTime.now());
        chatMessage = chatMessageService.saveChatMessage(chatMessage);
        var chatMessageDto = new ChatMessageDto(chatMessage);
        return chatMessageDto;
    }

    @GetMapping("/messages")
    public MessageResponseDto getMessages(Pageable pageable) {
        System.out.println("getMessages");
        Page<ChatMessageDto> page = chatMessageService.getChatMessages(pageable);

        return new MessageResponseDto(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
