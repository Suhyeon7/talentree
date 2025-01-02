package com.example.board_like.model;

import jakarta.persistence.*;
import java.util.Map;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    private String title;
    private String content;
    private int point;
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name="categoryId")
    private Category category;

    private Long userId;

    private int likeCount;
    private int dislikeCount;

    // 새로운 필드: 리뷰 항목별 선택 수를 저장
    @ElementCollection
    @CollectionTable(name = "board_review_count", joinColumns = @JoinColumn(name = "boardId"))
    @MapKeyColumn(name = "review_option")
    @Column(name = "count")
    private Map<String, Integer> reviewCounts;

    // 기본 생성자
    public Board() {}

    // Getter와 Setter 메서드
    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getImgUrl() {return imgUrl;}

    public void setImgUrl(String imgUrl) {this.imgUrl = imgUrl;}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public Map<String, Integer> getReviewCounts() {
        return reviewCounts;
    }

    public void setReviewCounts(Map<String, Integer> reviewCounts) {
        this.reviewCounts = reviewCounts;
    }
}
