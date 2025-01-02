import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import leftButton from "../assets/leftButton.png";
import profilePic from "../assets/profilePic.png";
import "../styles/MyHearts.css"; // 스타일 불러오기

const MyHearts = () => {
    const [boards, setBoards] = useState([]); // 게시물 데이터를 저장할 상태
    const navigate = useNavigate(); // 페이지 경로 이동 함수

    // 게시물 데이터 불러오기
    const fetchBoards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/boards");
            // boardId가 5에서 10까지인 게시물만 필터링
            const filteredBoards = response.data.filter(board => board.boardId >= 5 && board.boardId <= 10);
            setBoards(filteredBoards);
        } catch (error) {
            console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        fetchBoards(); // 컴포넌트가 처음 렌더링될 때 게시물 데이터 가져오기
    }, []);

    const handleBefore = () => {
        navigate("/profile"); // 이전 페이지로 이동
    };

    return (
        <div className="h-home-tab">
            {/* 상단 헤더 */}
            <div className="h-home-header">
                <img src={leftButton} alt="이전 페이지로 이동" onClick={handleBefore} className="h-header-img" />
                <h4>내 찜 목록</h4>
            </div>

            {/* 게시물 목록 */}
            <div className="h-list">
                {boards.map((board) => (
                    <div className="h-item" key={board.boardId}>
                        <div className="h-avatar">
                            <img src={board.imgUrl || profilePic} alt="Avatar" />
                        </div>
                        <div className="h-info">
                            <h3>{board.title}</h3>
                            <h5>{board.point} 포인트</h5>
                            <p>{board.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default MyHearts;
