package com.chat.multiplayerchat.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name="chat_message")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Column(name="date_time")
    private LocalDateTime dateTime;

    public ChatMessage(String message, User author, LocalDateTime dateTime) {
        this.message = message;
        this.author = author;
        this.dateTime = dateTime;
    }
}
