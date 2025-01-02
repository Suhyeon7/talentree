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

const MoreCurrent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 탭 열기 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 카테고리 탭 열기 상태
  const [boards, setBoards] = useState([]); // 게시물 상태
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 사용

  // 게시물 데이터를 가져오기 위한 함수
  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/boards"); // 백엔드 API 호출
      const allBoards = response.data;

      const sortedBoards = allBoards
          .sort((a, b) => b.boardId - a.boardId)
          .slice(0, 10)
          .reverse();

      setBoards(sortedBoards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards(); // 컴포넌트가 마운트될 때 게시물 데이터를 가져옴
    window.scrollTo(0,0)
  }, []);

  const handleHome = () => {
    // 텔런트리 클릭시 홈탭으로
    navigate("/home");
  };

  const handlePostClick = (postId) => {
    navigate(`/talent/${postId}`);
  };

  return (
      <div className="t-home-tab">
        {/* 상단 헤더 */}
        {/*<div className="t-home-header">*/}
        {/*  <FontAwesomeIcon*/}
        {/*      icon={faBars}*/}
        {/*      className="t-menu-icon"*/}
        {/*      onClick={() => setIsCategoryOpen(!isCategoryOpen)} // 카테고리 탭 열기/닫기*/}
        {/*  />*/}
        {/*  <img*/}
        {/*      src={mainLogo}*/}
        {/*      alt="main logo"*/}
        {/*      className="main-logo"*/}
        {/*      onClick={handleHome}*/}
        {/*  />*/}
        {/*  <FontAwesomeIcon*/}
        {/*      icon={faSearch}*/}
        {/*      className="t-search-icon"*/}
        {/*      onClick={() => setIsSearchOpen(true)} // 검색 탭 열기*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="h-home-header">
          <img src={leftButton} alt="이전 페이지로 이동" onClick={handleHome} className="t-header-img"/>
          <h4>최근 업로드된 재능 </h4>
        </div>

        {/* 카테고리 탭이 열리면 HomeCate 컴포넌트 렌더링 */}
        {isCategoryOpen && <HomeCate onClose={() => setIsCategoryOpen(false)}/>}

        {/* 검색 탭이 열리면 HomeSearch 컴포넌트 렌더링 */}
        {isSearchOpen && <HomeSearch onClose={() => setIsSearchOpen(false)}/>}

        {/* 이미지 슬라이더 영역 (검색 및 카테고리 탭이 열려있을 때는 숨김) */}
        {!isSearchOpen && !isCategoryOpen && (
            <>
              {/* 게시물 목록 */}
              <div className="t-list">
                {boards.slice().reverse().map((board, index) => (
                    <div className="t-item" key={index} onClick={() => handlePostClick(board.boardId)}>
                      <div className="t-avatar">
                        <img src={board.imgUrl || profilePic} alt="Avatar"/> {/* imgUrl을 먼저 시도, 없으면 기본 이미지 사용 */}
                      </div>
                      <div className="t-info">
                        <h3>{board.title}</h3>
                        <h3>{board.point} 포인트</h3>
                        <p>{board.content}</p>
                      </div>
                    </div>
                ))}
              </div>
            </>
        )}
        <Footer/>
      </div>
  );
};

export default MoreCurrent;
