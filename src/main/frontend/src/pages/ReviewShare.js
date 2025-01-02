import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동에 사용
import leftButton from "../assets/leftButton.png";
import "../styles/Review.css";

function ReviewShare() {
  const navigate = useNavigate(); // 페이지 경로 이동 함수
  const [rating, setRating] = useState(null);
  const [goodPoints, setGoodPoints] = useState([]);
  const [improvementPoints, setImprovementPoints] = useState([]);
  const [comment, setComment] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleGoodPointClick = (point) => {
    setGoodPoints((prev) => (prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]));
  };

  const handleImprovementPointClick = (point) => {
    setImprovementPoints((prev) => (prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]));
  };

  const handleSubmit = () => {
    // 로컬 스토리지에서 기존 포인트 값을 불러오기 (없으면 0으로 설정)
    const storedPoints = localStorage.getItem('userPoint');
    const currentPoint = storedPoints ? parseInt(storedPoints, 10) : 0;

    // 기존 포인트에 500점을 추가
    const updatedPoint = currentPoint + 500;

    const reviewData = {
      rating,
      goodPoints,
      improvementPoints,
      comment,
      point: updatedPoint, // 업데이트된 포인트 값을 사용
    };

    // 로컬 스토리지에 새로운 포인트 값 저장
    localStorage.setItem('userPoint', updatedPoint);

    // MyTab으로 이동 전에 포인트를 업데이트
    console.log("Review submitted:", reviewData);

    // MyTab으로 이동
    navigate("/Profile");
  };


  // 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
      <div className="container">
        {/* 상단 헤더 */}
        <div className="e-home-header">
          <img src={leftButton} alt="이전 페이지로 이동" className="h-header-img" onClick={goBack} />
          <h4>거래 후기</h4>
        </div>

        {/* 리뷰 컨텐츠 */}
        <div className="review-container">
          <h2>재능 공유가 완료되었어요.</h2>
          <p>이번 거래가 만족스러우셨길 바라요!</p>

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
            {["가르치는 시간이 보람찼어요", "매너가 좋아요", "답변이 빨라요", "시간 약속을 잘 지켜요", "열정적이에요"].map((point) => (
                <button key={point} className={`point-button ${goodPoints.includes(point) ? "selected" : ""}`} onClick={() => handleGoodPointClick(point)}>
                  {point}
                </button>
            ))}
          </div>

          <div className="improvement-points-section">
            <h3>어떤 점이 개선되면 좋을까요?</h3>
            {["시간 약속을 지키지 않았어요", "답변이 느려요", "불친절했어요"].map((point) => (
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

export default ReviewShare;
