import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectBox from "../components/selectBox"; // selectBox 대신 SelectBox로 변경
import CardGrid from "./CardGrid";
import "../styles/HomeSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HomeSearch = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [sortOption, setSortOption] = useState("인기순"); // 정렬 기준을 위한 상태
  const [showCardGrid, setShowCardGrid] = useState(false);
  const [showSelectBox, setShowSelectBox] = useState(false); // SelectBox 보이기 위한 상태
  const [showFilter, setShowFilter] = useState(false); // SelectBox 보이기 위한 상태
  const navigate = useNavigate(); // 페이지 경로 이동 함수
  // 로컬 스토리지에서 최근 검색어를 가져옴
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  // 검색어를 업데이트하고 로컬 스토리지에 저장
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      performSearch();
    }
  };

  //필터 페이지
  const SearchFilter = () => {
    navigate("/SearchFilter");
  };
  const performSearch = () => {
    const updatedSearches = [searchTerm, ...recentSearches.filter((term) => term !== searchTerm)].slice(0, 5); // 최대 5개 저장
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setSearchTerm(""); // 검색 후 검색어 초기화
    setShowSelectBox(true); // 검색 후 SelectBox 보이기
  };

  // 최근 검색어 삭제
  const handleDelete = (term) => {
    const updatedSearches = recentSearches.filter((search) => search !== term);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // 정렬 기준 변경 처리
  const handleSortChange = (selectedValue) => {
    setSortOption(selectedValue);
    setShowCardGrid(true); // CardGrid 보이기
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      performSearch(); // 검색어가 있으면 검색 실행
    }
    setShowSelectBox(true); // 검색 버튼 클릭 시 SelectBox 보이기
    setShowFilter(true); // 검색 버튼 클릭 시 SelectBox 보이기

    // 선택된 정렬 기준에 따라 handleSortChange 호출
    handleSortChange(sortOption); // 현재 sortOption을 사용하여 호출
  };

  return (
    <div className="search-tab">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="검색하기"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-button"
          onClick={handleSearchButtonClick} // 검색 버튼 클릭 시 핸들러 수정
        />
        <button className="close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
      <div className="selectContainer">
        {/* SelectBox를 검색창 아래에 위치 */}
        {showSelectBox && <SelectBox onChange={handleSortChange} />} {/* SelectBox 추가 */}
        {showFilter && (
          <button className="filterBtn" onClick={SearchFilter}>
            필터
          </button>
        )}
      </div>
      {/*  정렬 옵션 선택한 후 작동 CardGrid */}
      {showCardGrid && <CardGrid sortOption={sortOption} />}
      <div className="recent-searches">
        <h4>최근 검색어</h4>
        <ul>
          {recentSearches.map((term, index) => (
            <li key={index}>
              {term}
              <button onClick={() => handleDelete(term)}>×</button>
            </li>
          ))}
        </ul>
      </div>
      {/* <p style={{ marginLeft: "16px", fontWeight: "bold" }}>현재 정렬 기준 {sortOption}</p> 선택된 정렬 기준 출력 */}
    </div>
  );
};

export default HomeSearch;
