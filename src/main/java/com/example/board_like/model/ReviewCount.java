package com.example.board_like.model;

import jakarta.persistence.*;

@Entity
public class ReviewCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewItem;

    private long count;

    public ReviewCount() {}

    public ReviewCount(String reviewItem) {
        this.reviewItem = reviewItem;
        this.count = 0; // 초기 카운트 0
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewItem() {
        return reviewItem;
    }

    public void setReviewItem(String reviewItem) {
        this.reviewItem = reviewItem;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public void incrementCount() {
        this.count++;
    }
}
