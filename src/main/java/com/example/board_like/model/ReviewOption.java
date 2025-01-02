package com.example.board_like.model;

import jakarta.persistence.*;

@Entity
public class ReviewOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionId;

    private String optionName;

    // 기본 생성자
    public ReviewOption() {}

    public ReviewOption(String optionName) {
        this.optionName = optionName;
    }

    // Getter와 Setter
    public Long getOptionId() {
        return optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

    public String getOptionName() {
        return optionName;
    }

    public void setOptionName(String optionName) {
        this.optionName = optionName;
    }
}
