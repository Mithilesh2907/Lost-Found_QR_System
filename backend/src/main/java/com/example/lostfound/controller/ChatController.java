package com.example.lostfound.controller;

import com.example.lostfound.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.send/{chatId}")
    @SendTo("/topic/messages/{chatId}")
    public ChatMessage sendMessage(
            @DestinationVariable("chatId") String chatId, // 👈 FIX HERE
            ChatMessage message
    ) {
        System.out.println("MESSAGE RECEIVED: " + message.getText());
        return message;
    }
}