package com.example.board_like.controller;

import com.example.board_like.model.Category;
import com.example.board_like.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public DataInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Category> categories = Arrays.asList(
                //new Category("컴퓨터"),
                //new Category("자격증"),
                //new Category("언어"),
                //new Category("악기"),
                //new Category("운동"),
                //new Category("댄스"),
                //new Category("펫시터"),
                //new Category("청소"),
                //new Category("티켓팅"),
                //new Category("촬영")
        );

        for (Category category : categories) {
            if (!categoryRepository.existsByCategoryName(category.getCategoryName())) {
                categoryRepository.save(category);
            }
        }
    }
}
