import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import leftButton from "../assets/leftButton.png";
import profilePic from "../assets/profilePic.png";
import postEdit from "../assets/postEdit.png";
import "../styles/MyPosts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import mainLogo from "../assets/logo.png";
import HomeCate from "./HomeCate";
import HomeSearch from "./HomeSearch";

const MyPosts = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    const fetchBoards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/boards");
            setBoards(response.data);
        } catch (error) {
            console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        fetchBoards();
        window.scrollTo(0, 0);
    }, []);

    const handleBefore = () => {
        navigate("/profile");
    };

    const handleEditPostClick = (postId) => {
        navigate(`/edit-post/${postId}`); // PostEditTab으로 이동, postId 포함
    };

    const handleHome = () => {
        navigate("/home");
    };

    return (
        <div className="t-home-tab">
            {/* 상단 헤더 */}
            <div className="h-home-header">
                <img src={leftButton} alt="이전 페이지로 이동" onClick={handleBefore} className="h-header-img"/>
                <h4>내 재능 </h4>
            </div>

            {isCategoryOpen && <HomeCate onClose={() => setIsCategoryOpen(false)}/>}
            {isSearchOpen && <HomeSearch onClose={() => setIsSearchOpen(false)}/>}

            {!isSearchOpen && !isCategoryOpen && (
                <div className="t-list">
                    {boards.slice().reverse().map((board) => (
                        <div className="t-item" key={board.boardId}>
                            <div className="t-avatar">
                                <img src={board.imgUrl || profilePic} alt="Avatar"/>
                            </div>
                            <div className="t-info">
                                <h3>{board.title}</h3>
                                <h5>{board.point} 포인트</h5>
                                <p>{board.content}</p>
                            </div>
                            <img
                                src={postEdit}
                                className="edit-post-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditPostClick(board.boardId);
                                }}
                                alt="게시물 수정"
                            />
                        </div>
                    ))}
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default MyPosts;
