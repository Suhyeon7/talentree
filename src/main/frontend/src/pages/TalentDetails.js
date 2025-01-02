import {useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Regular Heart Icon
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid Heart Icon
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as regularThumbsDown } from "@fortawesome/free-regular-svg-icons";
import "../styles/TalentsDetails.css"; // CSS 파일 경로
import Footer from "../components/Footer";

const TalentDetails = ({ onBack, mainLogo, handleHome, isCategoryOpen, setIsCategoryOpen, setIsSearchOpen }) => {
  const { board_id } = useParams(); // URL에서 talentId 추출
  const [talent, setTalent] = useState(null); // 게시물 데이터를 저장할 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const navigate = useNavigate();
  const [point1,setPoint1] = useState(17)
  const [point2,setPoint2] = useState(34)
  // 하트 클릭 시 호출되는 함수
  const toggleHeart = () => {
    setIsLiked(!isLiked); // 현재 상태의 반대로 변경
  };
  // board_id를 기반으로 게시물 세부 정보를 가져오는 함수
  useEffect(() => {
    //localStorage.setItem('point1',17);
    //localStorage.setItem('point2',34);
    const Point1 = localStorage.getItem('point1');
    if(Point1){
      const n1=parseInt(Point1,10);
      if (!isNaN(n1)) {
        setPoint1(n1); // 업데이트된 포인트 값 설정
      }
    }
    const Point2 = localStorage.getItem('point2');
    if(Point2){
      const n2=parseInt(Point2,10);
      if (!isNaN(n2)) {
        setPoint2(n2); // 업데이트된 포인트 값 설정
      }
    }
    const fetchTalentDetails = async () => {
      try {
        // 백틱을 사용해 변수를 삽입
        const response = await axios.get(`http://localhost:8080/api/boards/${board_id}`);
        setTalent(response.data); // 받은 데이터를 상태로 설정
      } catch (error) {
        console.error("Error fetching talent details:", error);
      }
    };
    fetchTalentDetails();
  }, [board_id]); // board_id가 변경될 때마다 useEffect 실행

  // 로딩 중일 때 표시
  if (!talent) {
    return <div>로딩 중...</div>;
  }

  const hadleMove=()=>{
    navigate("/chat-room")
  }
  return (

      <div className="talent-details-container">
        <button className="back-button" onClick={onBack}>
          X
        </button>
        <div className="talent-details-content">
          <img src={talent.imgUrl} className="detail-image-placeholder" alt="Talent"/>
          <div className="talent-info">
            <h2>{talent.title}</h2>
            <p>{talent.content}</p>
            <span>{talent.point} 포인트</span>
          </div>

          {/* 좋아요, 추천 및 비추천 버튼 */}
          <div className="reviewers">
            <FontAwesomeIcon
                icon={regularThumbsUp}
                size="2x"
                style={{margin: "0 10px"}}
            />
            <strong>150</strong>
            <FontAwesomeIcon
                icon={regularThumbsDown}
                size="2x"
                style={{margin: "0 10px"}}
            />
            <strong>0</strong>
          </div>

          {/* 하단 : 채팅 및 찜하기 버튼 */}
          <div className="letsgoChat">
            <button className="letsgoChatBtn" onClick={hadleMove}>채팅하기</button>
            {/* 클릭 시 하트 아이콘 변경 */}
            <FontAwesomeIcon
                icon={isLiked ? solidHeart : regularHeart}
                size="2x"
                onClick={toggleHeart} // 클릭 이벤트 추가
                style={{cursor: "pointer", color: isLiked ? "#e74c3c" : "#000"}} // 색상 변경
            />
          </div>

          {/* 카테고리 선택 개수를 표시하는 영역 */}
          <div className="category-section">
            <h3 style={{marginLeft: "20px"}}>이런 점이 좋았어요</h3>
            <ul className="category-list">
              <li className="category-item">
                <span>📚 새로운 능력을 얻었어요</span>
                <strong>{point1}</strong>
              </li>
              <li className="category-item">
                <span>🤝 친절한 거래</span>
                <strong>32</strong>
              </li>
              <li className="category-item">
                <span>💬 채팅 답변이 빨라요</span>
                <strong>16</strong>
              </li>
              <li className="category-item">
                <span>🏠 생활의 질 향상</span>
                <strong>9</strong>
              </li>
              <li className="category-item">
                <span>🎨 취미를 늘릴 수 있었어요</span>
                <strong>{point2}</strong>
              </li>
            </ul>
          </div>

          {/* 사용자 후기를 표시하는 영역 */}
          <div className="reviews-section">
            <h3 style={{marginLeft: "20px"}}>사용자 후기</h3>
            <ul className="reviews-list">

              <li className="review-item">
                <div className="review-header">
                  <div className="review-author-details"></div>
                </div>

                <p className="review-content">✏️ 너무 친절하셨어요~ 약속 시간 급하게 변경해도 흔쾌히 응해주셔서 감사했어요!</p>
                {/* Selected options from the review */}
                <div className="review-selected-options">
                  <h5>이런 점이 좋았어요:</h5>
                  <ul className="selected-options-list">
                    <li className="category-item">
                      <span>🏠 생활의 질 향상</span>
                    </li>
                    <li className="category-item">
                      <span>💬 채팅 답변이 빨라요</span>
                    </li>
                    <li className="category-item">
                      <span>🤝 친절한 거래</span>
                    </li>
                  </ul>
                </div>

                <br/>
                <p className="review-content">✏️ 정말 유익했습니다 ㅎㅎ 기회가 된다면 또 배우고 싶어요~</p>
                {/* Selected options from the review */}
                <div className="review-selected-options">
                  <h5>이런 점이 좋았어요:</h5>
                  <ul className="selected-options-list">

                    <li className="category-item">
                      <span>📚 새로운 능력을 얻었어요</span>
                    </li>
                    <li className="category-item">
                      <span>🎨 취미를 늘릴 수 있었어요</span>
                    </li>
                  </ul>
                </div>
                <br/>
                <p className="review-content">✏️ 정말 짱 재밌었어요 !! 감사합니다!</p>
                {/* Selected options from the review */}
                <div className="review-selected-options">
                  <h5>이런 점이 좋았어요:</h5>
                  <ul className="selected-options-list">

                    <li className="category-item">
                      <span>📚 새로운 능력을 얻었어요</span>
                    </li>
                    <li className="category-item">
                      <span>🎨 취미를 늘릴 수 있었어요</span>
                    </li>
                    <li className="category-item">
                      <span>💬 채팅 답변이 빨라요</span>
                    </li>
                  </ul>
                </div>
                <br/>
                <p className="review-content">✏️ 너무 좋아요ㅎㅎ</p>
                {/* Selected options from the review */}
                <div className="review-selected-options">
                  <h5>이런 점이 좋았어요:</h5>
                  <ul className="selected-options-list">

                    <li className="category-item">
                      <span>📚 새로운 능력을 얻었어요</span>
                    </li>
                    <li className="category-item">
                      <span>🎨 취미를 늘릴 수 있었어요</span>
                    </li>
                  </ul>
                </div>
              </li>

            </ul>

          </div>

        </div>
        <Footer/>
      </div>

  );
};

export default TalentDetails;