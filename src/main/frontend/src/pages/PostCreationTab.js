import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import "../styles/PostCreationTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// 카테고리 객체: 카테고리 ID와 영문명을 포함
const categories = {
  "자기개발": {
    "자격증": { id: 11, english: "certification" },
    "취업 · 자소서": { id: 12, english: "job application and resume" },
    "언어": { id: 13, english: "language" },
    "컴퓨터": { id: 14, english: "computer" }
  },
  "취미": {
    "댄스": { id: 21, english: "dance" },
    "노래": { id: 22, english: "singing" },
    "악기": { id: 23, english: "guitar" },
    "스포츠": { id: 24, english: "sports" }
  },
  "생활": {
    "펫시터": { id: 31, english: "pet sitting" },
    "청소": { id: 32, english: "cleaning" }
  },
  "기타": {
    "스냅촬영": { id: 41, english: "snapshot photography" },
    "티켓팅": { id: 42, english: "ticketing using computer" }
  }
};

const PostCreationTab = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 서브카테고리 저장
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postPoint, setPostPoint] = useState("0");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category, subcategory) => {
    setSelectedCategory(subcategory); // 선택된 서브카테고리 이름 저장
  };

  // 뒤로가기 클릭 핸들러
  const handleBackClick = () => {
    navigate("/home");
  };

  const handleImageGeneration = async () => {
    if (!selectedCategory) {
      alert("먼저 카테고리를 선택해주세요.");
      return;
    }

    // 선택된 카테고리의 영문명 가져오기
    let translatedCategory = null;
    for (let cat in categories) {
      if (categories[cat][selectedCategory]) {
        translatedCategory = categories[cat][selectedCategory].english;
        break;
      }
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8000/generate-image", {
        prompt: `teaching someone ${translatedCategory}, aesthetic, in real world`,
      });
      const imageUrl = response.data.image_url;
      setImageUrl(imageUrl); // 이미지 URL 저장
    } catch (error) {
      console.error("이미지 생성 중 오류:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // 서버로 데이터 전송하는 함수
  const handleSubmit = async () => {
    const formData = new FormData();

    // 선택된 카테고리 ID와 영문명을 얻기 위해 매핑 테이블을 사용
    let selectedCategoryId = null;
    for (let cat in categories) {
      if (categories[cat][selectedCategory]) {
        selectedCategoryId = categories[cat][selectedCategory].id;
        break;
      }
    }

    formData.append("title", postTitle);
    formData.append("content", postDescription);
    formData.append("category_id", selectedCategoryId); // 선택된 카테고리 ID 전송
    formData.append("point", postPoint);
    if (imageUrl) {
      formData.append("imgUrl", imageUrl); // 이미지 URL 추가
    }

    try {
      const response = await axios.post("http://localhost:8080/api/newPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("게시물 전송 중 오류:", error);
    }
  };

  return (
      <div className="post-creation-tab">
        <div className="createTab-header">
          <button className="back-button" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" style={{ cursor: "pointer" }} />
          </button>
          <h1 className="header-text">게시물 작성하기</h1>
        </div>

        <div className="post-info">
          <label className="post-label">카테고리 선택</label>
          <div className="categories-container">
            {Object.keys(categories).map((category, index) => (
                <div key={index} className="category-group">
                  <div className="category-row">
                    <div className="category-name">{category}</div>
                    <div className="subcategory-group">
                      {Object.keys(categories[category]).map((subcategory, idx) => (
                          <button
                              key={idx}
                              className={`category-button ${selectedCategory === subcategory ? "selected" : ""}`}
                              onClick={() => handleCategoryClick(category, subcategory)}
                          >
                            {subcategory}
                          </button>
                      ))}
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {selectedCategory && (
              <div className="selected-category">
                <h4>선택된 카테고리</h4>
                <div className="selected-category-button">{selectedCategory}</div>
              </div>
          )}
          <div className="selected-category">
            <h4>이미지 추가</h4>
            <p>카테고리 선택 후 AI 이미지 생성하기 버튼을 누르면 AI 이미지가 생성 돼요!</p>
            <button onClick={handleImageGeneration} className="img-create-button">
              AI 이미지 생성하기
            </button>
            <button onClick={handleImageGeneration} className="img-create-button">
              내 이미지 추가하기
            </button>
          </div>

                {isLoading && <div className="loading-message">Loading...</div>}

                {imageUrl && (
                    <div className="generated-image">
                      <h3>생성된 이미지</h3>
                      <img width="330" src={imageUrl} alt="AI 생성 이미지"/>
                    </div>
                )}

                <h4 className="selected-category">게시물 제목</h4>
                <input
                    type="text"
                    placeholder="제목을 입력하세요."
                    className="post-title-input"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />

                <label className="post-label">설명</label>
                <textarea
                    placeholder="탤런트리에 공유할 재능 내용을 자세히 작성해주세요!"
                    className="post-description-input"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                />

                <div className="points-section">
                  <h3>포인트</h3>
                  <input
                      type="text"
                      placeholder="0"
                      className="post-point-input"
                      value={postPoint}
                      onChange={(e) => setPostPoint(e.target.value)}
                  />
                </div>

                <button className="submit-button" onClick={handleSubmit}>
                  작성하기
                </button>
              </div>

            <Footer />
            </div>
            );
          };

          export default PostCreationTab;
