package com.chat.multiplayerchat.repository;

import com.chat.multiplayerchat.dto.ChatMessageDto;
import com.chat.multiplayerchat.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("""
            SELECT new com.chat.multiplayerchat.dto.ChatMessageDto(
                m.id,
                m.message,
                m.dateTime,
                u
            )
            FROM ChatMessage m
            JOIN m.author u
            """)
    Page<ChatMessageDto> findAllDtos(Pageable pageable);
}