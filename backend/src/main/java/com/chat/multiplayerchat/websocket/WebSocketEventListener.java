package com.chat.multiplayerchat.websocket;

import com.chat.multiplayerchat.dto.ChatMessageDto;
import com.chat.multiplayerchat.entity.ChatMessage;
import com.chat.multiplayerchat.entity.User;
import com.chat.multiplayerchat.service.ChatMessageService;
import com.chat.multiplayerchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    private final ChatMessageService chatMessageService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String message = event.getUser().getName() + " has connected!";
        sendSystemMessage(message);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String message = event.getUser().getName() + " has disconnected!";
        sendSystemMessage(message);
    }

    private void sendSystemMessage(String message) {
        User systemUser = userService.loadCustomUserByUsername("system");
        var chatMessage = new ChatMessage(message, systemUser, LocalDateTime.now());
        chatMessage = chatMessageService.saveChatMessage(chatMessage);
        var chatMessageDto = new ChatMessageDto(chatMessage);
        messagingTemplate.convertAndSend("/chat/1", chatMessageDto);
    }
}

