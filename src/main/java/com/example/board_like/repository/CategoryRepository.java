package com.example.board_like.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.board_like.model.Category; // Category 모델 클래스 import
import org.springframework.stereotype.Service;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryName(String categoryName);
}


