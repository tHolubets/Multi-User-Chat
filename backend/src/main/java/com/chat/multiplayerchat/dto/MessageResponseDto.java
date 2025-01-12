package com.chat.multiplayerchat.dto;

import java.util.List;

public record MessageResponseDto(List<ChatMessageDto> messages, long totalElements,
                                 int totalPages, int currentPage, int pageSize) {
}
