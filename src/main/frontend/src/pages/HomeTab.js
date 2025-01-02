import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import HomeSearch from "./HomeSearch";
import HomeCate from "./HomeCate";
import TalentDetails from "./TalentDetails";
import axios from "axios";
import mainLogo from "../assets/logo.png";
import "../styles/HomeTab.css";
import mainImg from "../assets/mainImg.png";

const HomeTab = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [recentTalents, setRecentTalents] = useState([]);
  const [interestedTalents, setInterestedTalents] = useState([]);
  const [popularTalents, setPopularTalents] = useState([]);
  const navigate = useNavigate();

  const handleTalentClick = (talent) => {
    setSelectedTalent(talent);
    navigate(`/talent/${talent.boardId}`);
  };

  const handleBack = () => {
    setSelectedTalent(null);
  };

  const handleCreatePostClick = () => {
    navigate("/create-post");
  };

  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchCurrentTalents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/boards");
        const allTalents = response.data;
        const recentTalents = allTalents.reverse().slice(0, 5);
        setRecentTalents(recentTalents);
      } catch (error) {
        console.error("Error fetching current talents:", error);
      }
    };

    const fetchInterestedTalents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/boards");
        const interestTalents = response.data.filter(
            (board) => board.boardId >= 2 && board.boardId <= 6
        );
        setInterestedTalents(interestTalents);
      } catch (error) {
        console.error("Error fetching interested talents:", error);
      }
    };

    const fetchPopularTalents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/boards");
        const popularData = response.data.filter(
            (board) => board.boardId >= 7 && board.boardId <= 11
        );
        setPopularTalents(popularData);
      } catch (error) {
        console.error("Error fetching popular talents:", error);
      }
    };

    fetchCurrentTalents();
    fetchInterestedTalents();
    fetchPopularTalents();
  }, []);

  return (
      <div className="home-tab">
        {/* 상단 헤더 */}
        <div className="home-header">
          <FontAwesomeIcon
              icon={faBars}
              className="menu-icon"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          />
          <img src={mainLogo} alt="main logo" className="main-logo" onClick={handleHome} />
          <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={() => setIsSearchOpen(true)}
          />
        </div>

        {isCategoryOpen ? (
            <HomeCate onClose={() => setIsCategoryOpen(false)} />
        ) : (
            <>
              {isSearchOpen && <HomeSearch onClose={() => setIsSearchOpen(false)} />}

              {selectedTalent ? (
                  <TalentDetails talent={selectedTalent} onBack={handleBack} />
              ) : (
                  <>
                    {/* 이미지 슬라이더 영역 */}
                    <div className="image-slider">
                      <div className="slider-placeholder"><img src={mainImg}/></div>
                    </div>

                    {/* 최근 업로드 재능 영역 */}
                    <section className="current-talent">
                      <div className="section-header">
                        <h2 className="comment">가장 최근에 업로드 된 재능이에요</h2>
                        <Link to="/home/MoreCurrent" className="more-link" key="more-current">
                          더보기
                        </Link>
                      </div>
                      <div className="talent-list">
                        {recentTalents.length > 0 ? (
                            recentTalents.map((talent) => (
                                <div
                                    className="talent-item"
                                    key={talent.boardId}
                                    onClick={() => handleTalentClick(talent)}
                                >
                                  <img src={talent.imgUrl} className="image-placeholder" alt="Talent" />
                                  <div className="talent-info">
                                    <p>{talent.title}</p>
                                    <span>{talent.point} 포인트</span>
                                  </div>
                                </div>
                            ))
                        ) : (
                            <p>게시물이 없습니다.</p>
                        )}
                      </div>
                    </section>

                    {/* 내가 관심있는 재능 영역 */}
                    <section className="interested-talent">
                      <div className="section-header">
                        <h2 className="comment">내가 관심있는 재능이에요</h2>
                        <Link to="/home/MoreInterest" className="more-link">
                          더보기
                        </Link>
                      </div>
                      <div className="talent-list scrollable talent-list-horizontal">
                        {interestedTalents.map((talent) => (
                            <div
                                className="talent-item"
                                key={talent.boardId}
                                onClick={() => handleTalentClick(talent)}
                            >
                              <img src={talent.imgUrl} className="image-placeholder" alt="Talent" />
                              <div className="talent-info">
                                <p>{talent.title}</p>
                                <span>{talent.point} 포인트</span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </section>

                    {/* 추천 재능 영역 */}
                    <section className="recommended-talent">
                      <div className="section-header">
                        <h2 className="comment">지금 인기있는 재능을 추천드려요</h2>
                        <Link to="/home/MoreFamous" className="more-link">
                          더보기
                        </Link>
                      </div>
                      <div className="talent-list scrollable talent-list-horizontal">
                        {popularTalents.map((talent) => (
                            <div
                                className="talent-item"
                                key={talent.boardId}
                                onClick={() => handleTalentClick(talent)}
                            >
                              <img src={talent.imgUrl} className="image-placeholder" alt="Talent" />
                              <div className="talent-info">
                                <p>{talent.title}</p>
                                <span>{talent.point} 포인트</span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </section>

                    {/* 플러스 버튼 (게시물 작성 페이지로 이동) */}
                    <button className="create-post-button" onClick={handleCreatePostClick}>
                      <FontAwesomeIcon icon={faPlus} size="2x" />
                    </button>
                  </>
              )}
            </>
        )}
        <Footer />
      </div>
  );
};

export default HomeTab;
