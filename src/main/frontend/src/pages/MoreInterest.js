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
import axios from "axios";
import mainLogo from "../assets/logo.png";
import leftButton from "../assets/leftButton.png";

const MoreInterest = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 탭 열기 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 카테고리 탭 열기 상태
  const [interestedTalents, setInterestedTalents] = useState([]); // 관심있는 게시물 리스트
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 사용

  useEffect(() => {
    const fetchInterestedTalents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/boards");
        const interestTalents = response.data
            .sort((a, b) => a.boardId - b.boardId) // boardId 기준 정렬
            .slice(0, 11);

        setInterestedTalents(interestTalents);
      } catch (error) {
        console.error("Error fetching interested talents:", error);
      }
    };

    fetchInterestedTalents();
    window.scrollTo(0, 0);
  }, []);

  const handleHome = () => {
    // 텔런트리 클릭 시 홈탭으로 이동
    navigate("/home");
  };

  const handlePostClick = (postId) => {
    navigate(`/talent/${postId}`);
  };

  return (
      <div className="t-home-tab">
        {/* 상단 헤더 */}
        <div className="h-home-header">
          <img src={leftButton} alt="이전 페이지로 이동" onClick={handleHome} className="t-header-img"/>
          <h4>관심있는 재능 </h4>
        </div>

        {/* 카테고리 탭이 열리면 HomeCate 컴포넌트 렌더링 */}
        {isCategoryOpen && <HomeCate onClose={() => setIsCategoryOpen(false)}/>}

        {/* 검색 탭이 열리면 HomeSearch 컴포넌트를 렌더링 */}
        {isSearchOpen && <HomeSearch onClose={() => setIsSearchOpen(false)} />}

        {/* 카테고리 탭이나 검색 탭이 열려 있지 않고 선택된 게시물이 없을 때만 게시물 목록을 보여줌 */}
        {!isSearchOpen && !isCategoryOpen && (
            <>
              {/* 게시물 목록 */}
              <div className="t-list">
                {interestedTalents.map((talent, index) => (
                    <div className="t-item" key={index} onClick={() => handlePostClick(talent.boardId)}>
                      <div className="t-avatar">
                        <img src={talent.imgUrl || profilePic} alt="Avatar" /> {/* imgUrl을 먼저 시도, 없으면 기본 이미지 사용 */}
                      </div>
                      <div className="t-info">
                        <h3>{talent.title}</h3>
                        <h3>{talent.point} 포인트</h3>
                        <p>{talent.content}</p>
                      </div>
                    </div>
                ))}
              </div>
            </>
        )}

        <Footer />
      </div>
  );
};

export default MoreInterest;
