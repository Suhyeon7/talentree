import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginTab.css'; // 스타일 연결

const LoginTab = () => {
  const navigate = useNavigate();

  const handleAutoLogin = () => {
    navigate('/home');
  };

  return (
    <div className="login-tab">
      <div className="login-form">
        {/* 상단 텍스트 영역 */}
        <h1 className="login-title">재능이 자라는 곳</h1>
        <h2 className="login-subtitle">탤런트리🌳</h2>
        <p className="login-description">
          당신의 재능이 빛나는 순간,<br/>바로 지금입니다.<br/>환영해요!
        </p>

        {/* 입력 폼 */}
        <input type="email" id="email" placeholder="20220000" className="input-field"/>
        <div className="password-input">
          <input type="password" id="password" placeholder="••••••••" className="input-field"/>
        </div>

        {/* 비밀번호 찾기 */}
        <a href="#forgot-password" className="forgot-password">비밀번호를 잊으셨나요?</a>

        {/* 로그인 버튼 */}
        <button className="login-button" onClick={handleAutoLogin}>Login</button>

        {/* 회원가입 섹션 */}
        <div className="signup-section">
          아직 가입 전이신가요? <a href="#signup" className="signup-link">회원가입하기</a>
        </div>

        <hr className="divider"/>

        {/* 자동 로그인 섹션 */}
        <div className="auto-login">
          <span>덕성 웹메일로 자동 로그인</span>
          <button className="ds-login" onClick={handleAutoLogin}>
            <span className="ds-icon">D</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginTab;
