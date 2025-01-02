package com.example.board_like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.board_like.model.ReviewCount;

public interface ReviewCountRepository extends JpaRepository<ReviewCount, Long> {
    ReviewCount findByReviewItem(String reviewItem);
}
