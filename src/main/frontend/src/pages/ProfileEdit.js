import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import Footer from "../components/Footer";
import leftButton from "../assets/leftButton.png";
import "../styles/ProfileEdit.css"; // 스타일 불러오기

const MyPosts = () => {
  const navigate = useNavigate(); // 페이지 경로 이동 함수
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리

  const handleBefore = () => {
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    console.log("수정된 닉네임:", nickname); // 닉네임 정보 처리
    alert("닉네임이 수정되었습니다.");

    // 수정된 닉네임을 URL의 쿼리 파라미터로 전달
    navigate(`/profile?nickname=${encodeURIComponent(nickname)}`); // MyTab으로 이동
  };

  const handleChange = (e) => {
    setNickname(e.target.value); // 입력한 닉네임을 상태에 저장
  };

  return (
    <div className="e-home-tab">
      {/* 상단 헤더 */}
      <div className="e-home-header">
        <img src={leftButton} alt="이전 페이지로 이동" onClick={handleBefore} className="p-header-img" />
        <h4>프로필 수정</h4>
      </div>

      {/* 닉네임 수정 섹션 */}
      <div className="nickname-sec">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h4 htmlFor="nickname">새로운 닉네임을 입력하세요!</h4>
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={handleChange} required placeholder="새 닉네임을 입력하세요" />
          </div>
          <button type="submit" className="submit-btn">
            수정 완료
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default MyPosts;
