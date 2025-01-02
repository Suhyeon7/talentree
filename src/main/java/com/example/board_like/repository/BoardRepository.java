package com.example.board_like.repository;
//BoardRepository

import com.example.board_like.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.board_like.model.Board;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    // 좋아요(likeCount) 기준으로 내림차순 정렬
    List<Board> findAllByOrderByLikeCountDesc();

    // 포인트(point) 기준으로 오름차순 정렬
    List<Board> findAllByOrderByPointAsc();

    // 사용자 활동 점수(score) 기준으로 내림차순 정렬 (User와 조인)
    @Query("SELECT b FROM Board b JOIN User u ON b.userId = u.userId ORDER BY u.score DESC")
    List<Board> findAllByUserScoreDesc();

    List<Board> findByCategory_CategoryId(Long categoryId);  // 카테고리 ID로 게시물 조회

}


