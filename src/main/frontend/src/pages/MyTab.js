// MyTab.js 파일 수정
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 페이지 이동할 때 사용
import Footer from "../components/Footer";
import "../styles/MyTab.css";
import profilePic from "../assets/profilePic.png"; // 기본 프로필 이미지 가져오기
import rightButton from "../assets/rightButton.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const MyTab = () => {
  const navigate = useNavigate(); // 페이지 경로 이동 함수
  const location = useLocation(); // 현재 위치 정보
  const [nickname, setNickname] = useState("복단이"); // 초기 닉네임 설정
  const [profileImage, setProfileImage] = useState(profilePic); // 기본 프로필 이미지 설정
  const [points, setPoints] = useState(500); // 기본 포인트 값 설정
  const fileInputRef = useRef(null); // 파일 입력 참조

  useEffect(() => {
    // URL 쿼리 파라미터에서 닉네임 가져오기
    const params = new URLSearchParams(location.search);
    const newNickname = params.get("nickname"); // URL에서 닉네임 파라미터 가져오기
    if (newNickname) {
      setNickname(newNickname); // 닉네임 업데이트
    }

    // 로컬 스토리지에서 이미지 불러오기
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage); // 로컬 스토리지에서 불러온 이미지로 상태 업데이트
    }

    // Fetch updated points from localStorage and convert to number
    const storedPoints = localStorage.getItem('userPoint');
    //const storedPoints = localStorage.setItem('userPoint',500);
    if (storedPoints) {
      const numericPoints = parseInt(storedPoints, 10); // 숫자로 변환
      if (!isNaN(numericPoints)) {
        setPoints(numericPoints); // 업데이트된 포인트 값 설정
      }
    }

  }, [location.search]); // location.search가 변경될 때마다 useEffect 실행

  const handleProfileEdit = () => {
    navigate("/ProfileEdit");
  };

  const handleMyHearts = () => {
    navigate("/MyHearts");
  };

  const handleMyPosts = () => {
    navigate("/MyPosts");
  };

  const ReviewShare = () => {
    navigate("/ReviewShare");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 파일 선택
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 파일을 읽어서 상태 업데이트
        localStorage.setItem("profileImage", reader.result); // 로컬 스토리지에 이미지 저장
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  // 아이콘 클릭 시 파일 입력 열기
  const handleIconClick = () => {
    fileInputRef.current.click(); // 파일 입력 클릭
  };

  return (
      <div className="my-tab">
        {/* 상단 헤더 */}
        <div className="my-header">
          <h1 className="head-text">내 프로필</h1>
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={profileImage} alt="Profile Avatar" /> {/* 기본 프로필 이미지 사용 */}
            <div className="edit-icon" onClick={handleIconClick}>
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </div>
          </div>
          <h2 id="username">{nickname}</h2> {/* 닉네임이 여기에 표시됨 */}
          <div className="point_score">
            <div id="userid">
              <p style={{ marginRight: "10px" }}>포인트</p>
              <strong className="user-point">{points}</strong>점
            </div>
            <div id="userid">
              <p style={{ marginRight: "10px" }}>활동점수</p>
              <strong>1000</strong>점
            </div>
          </div>
        </div>

        {/* 숨겨진 파일 업로드 입력 */}
        <input
            type="file"
            ref={fileInputRef} // 파일 입력 참조
            accept="image/*" // 이미지 파일만 허용
            style={{ display: "none" }} // 화면에 보이지 않도록 숨김
            onChange={handleFileChange}
        />

        <div className="profile-options">
          <ul>
            <li onClick={handleProfileEdit}>
              <span>프로필 수정</span>
              <img src={rightButton} alt="페이지 이동" className="nextpage-btn"></img>
            </li>
            <li onClick={handleMyPosts}>
              <span>내 재능 보기</span>
              <img src={rightButton} alt="페이지 이동" className="nextpage-btn"></img>
            </li>
            <li onClick={handleMyHearts}>
              <span>내 찜 목록 보기</span>
              <img src={rightButton} alt="페이지 이동" className="nextpage-btn"></img>
            </li>
            <li onClick={ReviewShare}>
              <span>1:1 문의</span>
              <img src={rightButton} alt="페이지 이동" className="nextpage-btn"></img>
            </li>
          </ul>
        </div>

        <Footer />
      </div>
  );
};

export default MyTab;
