//App.js 파일 경로 추가
import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginTab from "./pages/LoginTab";
import HomeTab from "./pages/HomeTab";
import ChatTab from "./pages/ChatTab";
import MyTab from "./pages/MyTab";
import MoreInterest from "./pages/MoreInterest";
import MoreFamous from "./pages/MoreFamous";
import ProfileEdit from "./pages/ProfileEdit";
import MyPosts from "./pages/MyPosts";
import MyHearts from "./pages/MyHearts";
import PostCreationTab from "./pages/PostCreationTab";
import PostEditTab from "./pages/PostEditTab";
import ReviewReceive from "./pages/ReviewReceive";
import ReviewShare from "./pages/ReviewShare";
import TalentDetails from "./pages/TalentDetails";
import MoreCurrent from "./pages/MoreCurrent";
import ChatRoom from "./pages/ChatRoom";
import SearchFilter from "./pages/SearchFilter";
import CatePage from "./pages/CatePage";


import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  // 뒤로 가기 버튼을 클릭했을 때 호출되는 함수
    const handleBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade" nodeRef={nodeRef}>
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<LoginTab />} />
            <Route path="/home" element={<HomeTab />} />
            <Route path="/chat" element={<ChatTab />} />
            <Route path="/profile" element={<MyTab />} />
            <Route path="/home/MoreInterest" element={<MoreInterest />} />
            <Route path="/home/MoreFamous" element={<MoreFamous />} />
            <Route path="/home/MoreCurrent" element={<MoreCurrent />} />
            <Route path="/ProfileEdit" element={<ProfileEdit />} />
            <Route path="/MyPosts" element={<MyPosts />} />
            <Route path="/MyHearts" element={<MyHearts />} />
            <Route path="/create-post" element={<PostCreationTab />} />
            <Route path="/edit-post" element={<PostEditTab />} />
            <Route path="/ReviewReceive" element={<ReviewReceive />} />
            <Route path="/ReviewShare" element={<ReviewShare />} />
            <Route path="/TalentDetails" element={<TalentDetails />} />
            <Route path="/chat-room" element={<ChatRoom />} />
            <Route path="/SearchFilter" element={<SearchFilter />} />
            <Route path="/talent/:board_id" element={<TalentDetails onBack={handleBack} />} />
            <Route path="/category/:categoryId" element={<CatePage />} /> {/* 카테고리 페이지 */}
            <Route path="/edit-post/:postId" element={<PostEditTab />} />

          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
