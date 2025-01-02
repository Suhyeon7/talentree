package com.example.board_like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.board_like.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // 기본 JpaRepository 메서드 사용
}
