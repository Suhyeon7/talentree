//ReviewReceive.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import leftButton from "../assets/leftButton.png";
import "../styles/Review.css";
import {useNavigate} from "react-router-dom";

function ReviewReceive() {
  const [rating, setRating] = useState(null);
  const [goodPoints, setGoodPoints] = useState([]);
  const [improvementPoints, setImprovementPoints] = useState([]);
  const [comment, setComment] = useState("");
  const [point, setPoint] = useState("");
  const [minPoint, setMinPoint] = useState(500); // 기본 포인트 값, 서버에서 불러올 값
  const [error, setError] = useState(""); // 오류 메시지 상태
  const navigate = useNavigate();

  // 서버에서 게시물 정보 불러오기(수정 필요)
  useEffect(() => {
    axios
        .get("/api/post/123") // 게시물 정보 API 엔드포인트
        .then((response) => {
          const postData = response.data;
          setPoint(postData.point); // 서버에서 가져온 포인트 값 설정
          setMinPoint(postData.point); // 서버에서 가져온 값을 최소 포인트로 설정
        })
        .catch((error) => {
          console.error("Error fetching post data:", error);
        });
  }, []);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleGoodPointClick = (point) => {
    setGoodPoints((prev) => (prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]));
  };

  const handleImprovementPointClick = (point) => {
    setImprovementPoints((prev) => (prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]));
  };

  const handlePointChange = (e) => {
    const newPoint = e.target.value;
    setPoint(newPoint);

    // 최소 포인트 값보다 적으면 오류 메시지 표시
    if (Number(newPoint) < minPoint) {
      setError(`${minPoint} 포인트 이상을 입력해주세요!`);
    } else {
      setError(""); // 조건을 만족하면 오류 메시지 제거
    }
  };

  const handleSubmit = () => {
    const currentP1 = parseInt(localStorage.getItem("point1") || "17",10)
    const currentP2 = parseInt(localStorage.getItem("point2") || "34",10)
    console.log(currentP1)
    const update1 = currentP1+1;

    const update2 = currentP2 + 1;

    if (error) {
      alert("오류를 해결해 주세요.");
      return;
    }

    const reviewData = {
      rating,
      goodPoints,
      improvementPoints,
      comment,
      point, // 포인트 추가
      point1:update1, point2:update2
    };
    console.log("Review submitted:", reviewData);
    localStorage.setItem('point1', update1);
    localStorage.setItem('point2', update2);
    // TODO: 서버로 전송하는 로직 추가
    navigate("/talent/5")
  };

  return (
      <div className="container">
        {/* 상단 헤더 */}
        <div className="e-home-header">
          <img src={leftButton} alt="이전 페이지로 이동" className="h-header-img" />
          <h4>거래 후기</h4>
        </div>

        {/* 리뷰 컨텐츠 */}
        <div className="review-container">
          <h2>재능 거래가 완료되었어요.</h2>
          <p>이번 거래가 만족스러우셨길 바라요!</p>

          <div className="point-section">
            <h3>포인트를 입력해주세요!</h3>
            <p>거래가 좋았다면 추가 지급도 가능해요.</p>
            <div className="point-input-container">
              <input type="number" className="point-value" value={point} onChange={handlePointChange} placeholder={minPoint.toString()}></input>
              <span className="point-text">포인트</span>
            </div>
            {/* 오류 메시지 표시 */}
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="rating-section">
            <h3>거래한 덕우에게 평가를 남겨주세요!</h3>
            <button className={`rating-button ${rating === "good" ? "selected" : ""}`} onClick={() => handleRating("good")}>
              좋아요
            </button>
            <button className={`rating-button ${rating === "bad" ? "selected" : ""}`} onClick={() => handleRating("bad")}>
              싫어요
            </button>
          </div>

          <div className="good-points-section">
            <h3>어떤 점이 좋았나요?</h3>
            {["📚 새로운 능력을 얻었어요","🤝 친절한 거래", "💬 채팅 답변이 빨라요", "🏠 생활의 질 향상", "🎨 취미를 늘릴 수 있었어요"].map((point) => (
                <button key={point} className={`point-button ${goodPoints.includes(point) ? "selected" : ""}`} onClick={() => handleGoodPointClick(point)}>
                  {point}
                </button>
            ))}
          </div>

          <div className="improvement-points-section">
            <h3>어떤 점이 개선되면 좋을까요?</h3>
            {["시간 약속을 지키지 않았어요", "답변이 느려요", "불친절했어요", "난이도가 어려웠어요"].map((point) => (
                <button
                    key={point}
                    className={`point-button ${improvementPoints.includes(point) ? "selected" : ""}`}
                    onClick={() => handleImprovementPointClick(point)}
                >
                  {point}
                </button>
            ))}
          </div>

          <div className="comment-section">
            <h3>기타 의견을 남겨주세요.</h3>
            <textarea placeholder="어떤 의견이든 좋아요!" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>

          <button className="review-submit-button" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
  );
}

export default ReviewReceive;