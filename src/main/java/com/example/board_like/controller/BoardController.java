package com.example.board_like.controller;

//import com.example.board_like.service.ChatService;
import com.example.board_like.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.*;

import com.example.board_like.model.Board;
import com.example.board_like.service.BoardService;
import com.example.board_like.service.CategoryService;
import com.example.board_like.model.Review;
import com.example.board_like.service.ReviewService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RestController
@RequestMapping("/api")
@ServerEndpoint("/websocket")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {

    private final BoardService boardService;
    private final CategoryService categoryService;
    private static final List<Session> sessionList = new ArrayList<>();

    @Autowired
    private ReviewService reviewService;

    public BoardController(BoardService boardService, CategoryService categoryService) {
        this.boardService = boardService;
        this.categoryService = categoryService;
    }

    // Landing page
    @GetMapping("/")
    public String landing() {
        return "landing";  // Serve landing.html
    }

    @GetMapping("/boards")
    public List<Board> list(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            // categoryId가 있으면 해당 카테고리의 게시물만 반환
            return boardService.getBoardsByCategory(categoryId);
        } else {
            // categoryId가 없으면 전체 게시물 반환
            return boardService.getAllBoards();
        }
    }

    // 게시물 세부 정보 페이지(1010 소정 추가)
    @GetMapping("/boards/{id}")
    public Board getBoardDetail(@PathVariable Long id) {
        return boardService.getBoardById(id);  // 특정 ID로 게시물 세부 정보 반환
    }

//    public String list(Model model) {
//        List<Board> boards = boardService.getAllBoards();
//        model.addAttribute("boards", boards);
//        return "list";  // Serve list.html
//    }

    // 게시물 등록 페이지
    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("board", new Board());
        model.addAttribute("categories", categoryService.getAllCategories());
        return "create";
    }

    // 게시물 등록 처리
//    @PostMapping("/newPost")        //'/'
//    public String create(@ModelAttribute Board board) {
//        boardService.saveBoard(board);
//        return "redirect:/boards";
//    }
// 게시물 등록 처리
    @PostMapping("/newPost")
    public String create(@RequestParam String title,
                         @RequestParam String content,
                         @RequestParam Long category_id,
                         @RequestParam int point,
                         @RequestParam(required = false) String imgUrl) { // 이미지 URL을 선택적 파라미터로 추가


        // category_id를 이용해 Category 객체 조회
        Optional<Category> categoryOpt = categoryService.getCategoryById(category_id);

        if (categoryOpt.isEmpty()) {
            return "카테고리가 존재하지 않습니다.";
        }

        Category category = categoryOpt.get();

        // Board 객체 생성 및 설정
        Board board = new Board();
        board.setTitle(title);
        board.setContent(content);
        board.setPoint(point);
        board.setCategory(category);  // 카테고리 설정
        board.setImgUrl(imgUrl);  // 이미지 URL 설정

        boardService.saveBoard(board);  // 저장
        return "게시물이 성공적으로 저장되었습니다.";
    }


    // 게시물 수정 페이지
    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        Board board = boardService.getBoardById(id);
        model.addAttribute("board", board);
        model.addAttribute("categories", categoryService.getAllCategories());
        return "edit";
    }

    // 게시물 수정 처리
    @PostMapping("/{id}/edit")
    public String update(@PathVariable Long id, @ModelAttribute Board board) {
        boardService.updateBoard(id, board);
        return "redirect:/boards";
    }

    // 좋아요 처리
    @PostMapping("/{id}/like")
    public String likeBoard(@PathVariable Long id) {
        boardService.likeBoard(id);
        return "redirect:/boards";
    }

    // 싫어요 처리
    @PostMapping("/{id}/dislike")
    public String dislikeBoard(@PathVariable Long id) {
        boardService.dislikeBoard(id);
        return "redirect:/boards";
    }

    // API: Get filtered boards
    /*@GetMapping("/boards")
    @ResponseBody
    public List<Board> getFilteredBoards(@RequestParam String sort) {
        switch (sort) {
            case "likeCount":
                return boardService.getBoardsByLikeCount();
            case "score":
                return boardService.getBoardsByUserScore();
            case "point":
                return boardService.getBoardsByPoint();
            default:
                throw new IllegalArgumentException("Invalid sort option");
        }
    }*/


    @GetMapping("/index")
    public String indexPage() {
        return "index";  // This will serve index.html
    }

    @GetMapping("/chat")
    public String chatPage() {
        return "chat";  // chat.html 파일을 반환
    }

    // WebSocket methods
    @OnOpen
    public void open(Session newUser) {
        System.out.println("connected");
        sessionList.add(newUser);
        System.out.println("현재 접속중인 유저 수 : " + sessionList.size());
    }
//    @OnMessage
//    public void handleMessage(Session receiveSession, String msg) {
//        for (Session session : sessionList) {
//            try {
//                session.getBasicRemote().sendText(msg);  // 모든 세션에 메시지 전송
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        chatService.saveMessage(receiveSession.getId(), msg);  // 메시지 저장
//    }
//
//    @OnClose
//    public void close(Session session) {
//        sessionList.remove(session);
//        System.out.println("유저가 연결을 종료했습니다: " + session.getId());
//    }

    /*@OnMessage
    public void getMsg(Session receiveSession, String msg) {
        for (Session session : sessionList) {
            try {
                if (!receiveSession.getId().equals(session.getId())) {
                    session.getBasicRemote().sendText("유저" + (Integer.parseInt(session.getId()) + 1) + " : " + msg);
                } else {
                    session.getBasicRemote().sendText("나 : " + msg);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Scheduled(cron = "* * * * * *")
    private void isSessionClosed() {
        if (!sessionList.isEmpty()) {
            sessionList.removeIf(session -> !session.isOpen());
        }
    }*/

    // Review-related methods
    @GetMapping("/reviewResult")
    public String reviewResult(Model model) {
        model.addAttribute("newSkillCount", reviewService.getCount("배우는 시간이 보람찼어요"));
        model.addAttribute("kindTransactionCount", reviewService.getCount("매너가 좋아요"));
        model.addAttribute("fastResponseCount", reviewService.getCount("답변이 빨라요"));
        model.addAttribute("lifeImprovementCount", reviewService.getCount("시간 약속을 잘 지켜요"));
        model.addAttribute("hobbyIncreaseCount", reviewService.getCount("열정적이에요"));

        return "reviewResult";
    }

    @PostMapping("/submitReview")
    public String submitReview(@RequestParam("selectedOptions") List<String> selectedOptions) {
        Review review = new Review();
        review.setSelectedOptions(selectedOptions);

        // 각 선택된 항목의 카운트를 증가
        for (String option : selectedOptions) {
            reviewService.incrementCount(option);
        }

        // 리뷰 저장
        reviewService.saveReview(review);

        return "redirect:/reviewResult";
    }

    @GetMapping("/testReview")
    public String testReview() {
        return "testReview"; // testReview.html로 이동
    }

    @RestController
    public class CategoryController {
        private final CategoryService categoryService;

        @Autowired
        public CategoryController(CategoryService categoryService) {
            this.categoryService = categoryService;
        }

        @GetMapping("/categories")
        public List<Category> getCategories() {
            return categoryService.getAllCategories();
        }
        @GetMapping("/boards/{id}")
        public Board getBoardById(@PathVariable Long id) {
            return boardService.getBoardById(id); // board_id에 맞는 게시물 데이터 반환
        }
        @CrossOrigin(origins = "http://localhost:3000")
        @PutMapping("/api/boards/{id}")
        public ResponseEntity<Board> updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard) {
            Board existingBoard = boardService.getBoardById(id);
            if (existingBoard != null) {
                existingBoard.setTitle(updatedBoard.getTitle());
                existingBoard.setContent(updatedBoard.getContent());
                existingBoard.setPoint(updatedBoard.getPoint());

                boardService.saveBoard(existingBoard);
                return ResponseEntity.ok(existingBoard);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        @GetMapping("/boards/popular")
        public List<Board> getPopularBoards() {
            return boardService.getBoardsByLikeCount();
        }



    }
    }
