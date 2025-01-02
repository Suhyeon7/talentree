import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faUser } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home"); // 현재 활성화된 탭 관리

  // 페이지가 로드될 때, localStorage에서 저장된 탭 상태를 가져옴
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // 탭 클릭 시 실행
  const handleTabClick = (tab) => {
    setActiveTab(tab); // 상태 업데이트
    localStorage.setItem("activeTab", tab); // 선택된 탭을 localStorage에 저장

    // 상태가 업데이트된 후 네비게이션을 호출
    setTimeout(() => {
      if (tab === "home") navigate("/home");
      if (tab === "chat") navigate("/chat");
      if (tab === "profile") navigate("/profile");
    }, 0); // 상태 업데이트 후 navigate 실행
  };

  return (
    <footer className="footer">
      <div className={`tab ${activeTab === "home" ? "active" : ""}`} onClick={() => handleTabClick("home")}>
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span>홈</span>
      </div>
      <div className={`tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => handleTabClick("chat")}>
        <FontAwesomeIcon icon={faComments} size="lg" />
        <span>채팅</span>
      </div>
      <div className={`tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => handleTabClick("profile")}>
        <FontAwesomeIcon icon={faUser} size="lg" />
        <span>프로필</span>
      </div>
    </footer>
  );
};

export default Footer;
