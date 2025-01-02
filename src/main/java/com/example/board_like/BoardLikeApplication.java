package com.example.board_like;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
@SpringBootApplication
public class BoardLikeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoardLikeApplication.class, args);
    }
}
