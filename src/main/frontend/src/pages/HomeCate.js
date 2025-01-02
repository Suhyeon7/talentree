import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅
import '../styles/HomeCate.css'; // 스타일링을 위한 CSS 파일 임포트

const HomeCate = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 카테고리 클릭 시 해당 카테고리 페이지로 이동
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // 카테고리 ID를 URL에 포함하여 이동
  };

  return (
    <div className="home-cate">
      {/* 카테고리 리스트 */}
      <div className="cate-list">
        <div className="cate-section">
          <h3 className="cate-section-title">자기개발</h3>
          <ul className="cate-items">
            <li onClick={() => handleCategoryClick(11)}>자격증</li>
            <li onClick={() => handleCategoryClick(12)}>취업 · 자소서</li>
            <li onClick={() => handleCategoryClick(13)}>언어</li>
            <li onClick={() => handleCategoryClick(14)}>컴퓨터</li>
          </ul>
        </div>

        <div className="cate-section">
          <h3 className="cate-section-title">취미</h3>
          <ul className="cate-items">
          <li onClick={() => handleCategoryClick(21)}>댄스</li>
          <li onClick={() => handleCategoryClick(22)}>노래</li>
            <li onClick={() => handleCategoryClick(23)}>악기</li>
            <li onClick={() => handleCategoryClick(24)}>스포츠</li>
          </ul>
        </div>

        <div className="cate-section">
          <h3 className="cate-section-title">생활</h3>
          <ul className="cate-items">
            <li
            onClick={() => handleCategoryClick(31)}>펫시터</li>
            <li onClick={() => handleCategoryClick(32)}>청소</li>
          </ul>
        </div>

        <div className="cate-section">
             <h3 className="cate-section-title">기타</h3>
             <ul className="cate-items">
              <li onClick={() => handleCategoryClick(41)}>스냅촬영</li>
              <li onClick={() => handleCategoryClick(42)}>티켓팅</li>
             </ul>
        </div>

      </div>
    </div>
  );
};

export default HomeCate;
