import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/HomeTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import HomeSearch from "./HomeSearch"; // 검색 탭 컴포넌트 불러오기
import HomeCate from "./HomeCate"; // 카테고리 탭 컴포넌트 불러오기
import profilePic from "../assets/profilePic.png"; // 게시물 기본 이미지
import "../styles/More.css"; // 스타일 불러오기
import axios from "axios"; // Axios를 import
import mainLogo from "../assets/logo.png";
import leftButton from "../assets/leftButton.png";

const MoreFamous = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 탭 열기 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 카테고리 탭 열기 상태
  const [popularTalents, setPopularTalents] = useState([]); // 인기 게시물 상태
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 사용

  const handleHome = () => {
    navigate("/home");
  };

  const handlePostClick = (postId) => {
    navigate(`/talent/${postId}`);
  };

  // 데이터베이스에서 20번째부터 30번째 게시물 가져오기
  useEffect(() => {
    const fetchPopularTalents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/boards");
        const popularData = response.data
            .sort((a, b) => a.boardId - b.boardId) // board_id 기준 내림차순 정렬
            .slice(5, 16);

        setPopularTalents(popularData); // 오름차순으로 표시
      } catch (error) {
        console.error("Error fetching popular talents:", error);
      }
    };

    fetchPopularTalents();
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="t-home-tab">
        {/* 상단 헤더 */}
        <div className="h-home-header">
          <img src={leftButton} alt="이전 페이지로 이동" onClick={handleHome} className="t-header-img"/>
          <h4>인기있는 재능 </h4>
        </div>

        {/* 카테고리 탭이 열리면 HomeCate 컴포넌트 렌더링 */}
        {isCategoryOpen && <HomeCate onClose={() => setIsCategoryOpen(false)}/>}

        {/* 검색 탭이 열리면 HomeSearch 컴포넌트 렌더링 */}
        {isSearchOpen && <HomeSearch onClose={() => setIsSearchOpen(false)} />}

        {/* 게시물 목록 */}
        {!isSearchOpen && !isCategoryOpen && (
            <div className="t-list">
              {popularTalents.map((board, index) => (
                  <div className="t-item" key={index} onClick={() => handlePostClick(board.boardId)}>
                    <div className="t-avatar">
                      <img src={board.imgUrl || profilePic} alt="Avatar" /> {/* imgUrl을 먼저 시도, 없으면 기본 이미지 사용 */}
                    </div>
                    <div className="t-info">
                      <h3>{board.title}</h3>
                      <h3>{board.point} 포인트</h3>
                      <p>{board.content}</p>
                    </div>
                  </div>
              ))}
            </div>
        )}
        <Footer />
      </div>
  );
};

export default MoreFamous;
