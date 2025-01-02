import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import HomeSearch from "./HomeSearch";
import HomeCate from "./HomeCate";
import mainLogo from "../assets/logo.png";
import "../styles/CardGrid.css";
import Footer from "../components/Footer";
import SelectBox from "../components/selectBox";

const CatePage = () => {
  const { categoryId } = useParams();
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("인기순");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showSelectBox] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      fetchBoardsByCategory(categoryId);
    }
    // eslint-disable-next-line
  }, [categoryId]);

  const handlePostClick = (postId) => {
    navigate(`/talent/${postId}`);
  };

  const handleHome = () => {
    navigate("/home");
  };

  const SearchFilter = () => {
    navigate("/SearchFilter");
  };

  const fetchBoardsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/boards`, {
        params: { categoryId: categoryId },
      });
      let sortedBoards = response.data;
      sortedBoards = sortItems(sortedBoards, sortOption);
      setBoards(sortedBoards);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setError("Failed to fetch board data");
    }
  };


  const sortItems = (boards, option) => {
    let sorted = [...boards];
    if (option === "인기순") {
      sorted.sort((a, b) => b.point - a.point);
    } else if (option === "낮은 포인트 순") {
      sorted.sort((a, b) => a.point - b.point);
    } else if (option === "높은 활동점수 순") {
      sorted.sort((a, b) => b.score - a.score);
    }
    return sorted;
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
    setBoards(sortItems(boards, selectedOption));
  };

  return (
      <div className="cate-page">
        <div className="t-home-header">
          <FontAwesomeIcon
              icon={faBars}
              className="t-menu-icon"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          />
          <img
              src={mainLogo}
              alt="main logo"
              className="main-logo"
              onClick={handleHome}
          />
          <FontAwesomeIcon
              icon={faSearch}
              className="t-search-icon"
              onClick={() => setIsSearchOpen(true)}
          />
        </div>

        {isCategoryOpen && (
            <HomeCate onClose={() => setIsCategoryOpen(false)} />
        )}
        {isSearchOpen && (
            <HomeSearch onClose={() => setIsSearchOpen(false)} />
        )}
        {error && <p>{error}</p>}

        <div className="selectContainer">
          {showSelectBox && <SelectBox onChange={handleSortChange} />}
          <button className="filterBtn" onClick={SearchFilter}>필터</button>
        </div>

        <div className="grid-container">
          {boards.length > 0 ? (
              boards.map((board) => (
                  <div
                      key={board.id}
                      className="grid-item"
                      onClick={() => handlePostClick(board.boardId)}
                  >
                    <div className="image-placeholder">
                      <img src={board.imgUrl} className="image-placeholder" alt="Talent"/>
                    </div>
                    <div className="item-details">
                      <h4>{board.title}</h4>
                      <p>{board.point} 포인트</p>
                      {/*<p>{board.score} 점</p>*/}
                    </div>
                  </div>
              ))
          ) : (
              <p>해당 카테고리에 게시물이 없습니다.</p>
          )}
        </div>

        <Footer />
      </div>
  );
};

export default CatePage;
