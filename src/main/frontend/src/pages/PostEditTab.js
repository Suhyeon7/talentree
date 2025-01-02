import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import "../styles/PostEditTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PostEditTab = () => {
  const { postId } = useParams();
  console.log(postId);  // postId가 올바르게 출력되는지 확인
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postPoint, setPostPoint] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/boards/${postId}`);
        const { title, content, point } = response.data;
        setPostTitle(title);
        setPostDescription(content);
        setPostPoint(point);
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchPostData();
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      await axios.put(`http://localhost:8080/api/boards/${postId}`, {
        title: postTitle,
        content: postDescription,
        point: postPoint,
      });
      alert("게시물이 성공적으로 수정되었습니다.");
      navigate(`/MyPosts`); // 수정 후 MyPosts로 이동
    } catch (error) {
      console.error("게시물 업데이트 중 오류가 발생했습니다:", error);
      alert("게시물 업데이트 중 오류가 발생했습니다: " + error.message);
    }
  };



  return (
      <div className="post-edit-tab">
        <div className="header">
          <button className="back-button" onClick={() => navigate("/MyPosts")}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" style={{ cursor: "pointer" }} />
          </button>
          <h1 className="header-text">게시물 수정하기</h1>
        </div>

        <div className="post-info">
          <label className="post-label">게시물 제목</label>
          <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="post-title-input"
          />

          <label className="post-label">설명</label>
          <textarea
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="post-description-input"
          />

          <label className="post-label">포인트</label>
          <input
              type="number"
              value={postPoint}
              onChange={(e) => setPostPoint(e.target.value)}
              className="post-point-input"
          />

          <button className="submit-button" onClick={handleUpdatePost}>
            수정하기
          </button>
        </div>

        <Footer />
      </div>
  );
};

export default PostEditTab;
