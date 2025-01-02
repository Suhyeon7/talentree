package com.example.board_like.model;

import jakarta.persistence.*;

@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    private Long userId;
    private Long boardId;

    // 기본 생성자
    public Bookmark() {}

    // Getter와 Setter 메서드
    public Long getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(Long bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }
}
