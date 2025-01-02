package com.example.board_like.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@ServerEndpoint("/ws/chat")
@Component
public class WebSocketHandler {

    private static final List<Session> sessions = new ArrayList<>();
    private static final int MAX_USERS = 10; // 최대 접속자 수 설정
    private static final String MESSAGE_FILE_PATH = "src/main/resources/chatMessages.json";
    private ObjectMapper objectMapper = new ObjectMapper();

    @OnOpen
    public void open(Session newUser) {
        if (sessions.size() >= MAX_USERS) {
            try {
                newUser.getBasicRemote().sendText("max_users_exceeded");
                newUser.close();
                System.out.println("최대 접속자 수에 도달하여 연결을 종료합니다.");
                return;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        sessions.add(newUser);
        System.out.println("현재 접속 중인 유저 수: " + sessions.size());

        try {
            List<Message> messages = loadMessages();
            for (Message message : messages) {
                String messageToSend = message.getSender() + ":" + message.getText();
                newUser.getBasicRemote().sendText(messageToSend);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnMessage
    public void getMsg(Session receiveSession, String msg) {
        String sender = receiveSession.getId();

        String[] parts = msg.split(":", 2);
        if (parts.length == 2) {
            String senderId = parts[0];
            String content = parts[1];

            Message message = new Message(senderId, content);
            saveMessage(message);

            for (Session session : sessions) {
                try {
                    if (session.isOpen()) {
                        session.getBasicRemote().sendText(senderId + ":" + content);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @OnClose
    public void close(Session session) {
        sessions.remove(session);
        System.out.println("세션 종료: " + session.getId());
        System.out.println("현재 접속 중인 유저 수: " + sessions.size());
    }

    @OnError
    public void handleError(Session session, Throwable throwable) {
        System.err.println("오류 발생: " + throwable.getMessage());
        throwable.printStackTrace();
    }

    private void saveMessage(Message message) {
        try {
            List<Message> messages = loadMessages();
            messages.add(message);
            objectMapper.writeValue(new File(MESSAGE_FILE_PATH), messages);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<Message> loadMessages() throws IOException {
        File file = new File(MESSAGE_FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        return objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Message.class));
    }
}

// Message 클래스
class Message {
    private String sender;
    private String text;

    public Message() {}

    public Message(String sender, String text) {
        this.sender = sender;
        this.text = text;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
