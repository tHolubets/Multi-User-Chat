package com.chat.multiplayerchat.service;

import com.chat.multiplayerchat.dto.ChatMessageDto;
import com.chat.multiplayerchat.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChatMessageService {
    ChatMessage saveChatMessage(ChatMessage chatMessage);

    Page<ChatMessageDto> getChatMessages(Pageable pageable);
}
