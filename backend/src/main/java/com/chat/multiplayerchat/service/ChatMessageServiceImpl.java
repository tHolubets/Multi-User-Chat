package com.chat.multiplayerchat.service;

import com.chat.multiplayerchat.dto.ChatMessageDto;
import com.chat.multiplayerchat.entity.ChatMessage;
import com.chat.multiplayerchat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessage saveChatMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    public Page<ChatMessageDto> getChatMessages(Pageable pageable) {
        return chatMessageRepository.findAllDtos(pageable);
    }
}
