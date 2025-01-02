//ChatTab.js 새로 생성
import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import Footer from "../components/Footer"; // Footer 컴포넌트 불러오기
import profilePic from "../assets/profilePic.png";
import "../styles/ChatTab.css"; // 스타일 파일 연결

const ChatTab = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleChatClick = (index) => {
    if (index === 0) {
      // 첫 번째 채팅을 클릭했을 때만 이동
      navigate("/chat-room");
    }
  };
 const handleFirstChat = () => {
   navigate("/chat-room");
 }

  return (
    <div className="chat-tab">
      {/* 상단 헤더 */}
      <div className="chat-header">
        <h1 className="head-text">나의 채팅</h1>
      </div>
      {/* 채팅 목록 */}
        <div className="chat-list">
            <div className="chat-item" onClick={handleFirstChat}>
                <div className="chat-avatar">
                    <img src={profilePic} alt="Avatar"/>
                </div>
                <div className="chat-info">
                    <h3>락스타의 기타교실 </h3>
                </div>
                <div className="chat-badge">
                    <span>1</span> {/* 랜덤으로 알림 배지 */}
                </div>
            </div>
            <div className="chat-item" onClick={handleFirstChat}>
                <div className="chat-avatar">
                    <img src={profilePic} alt="Avatar"/>
                </div>
                <div className="chat-info">
                    <h3>정보처리기사 고수</h3>
                </div>
                <div className="chat-badge">
                    <span>1</span> {/* 랜덤으로 알림 배지 */}
                </div>
            </div>


            {Array.from({length: 5}).map((_, index) => (
                <div className="chat-item" key={index} onClick={() => handleChatClick(index)}>
                    <div className="chat-avatar">
                        <img src={profilePic} alt="Avatar"/>
                    </div>
                    <div className="chat-info">
                        <h3>사용자 이름 {index + 1}</h3>
                    </div>
                    <div className="chat-badge">
                        <span>{Math.floor(Math.random() * 10)}</span> {/* 랜덤으로 알림 배지 */}
                    </div>
                </div>
            ))}
        </div>
        <Footer/> {/* Footer 컴포넌트 */}
    </div>
  );
};

export default ChatTab;
