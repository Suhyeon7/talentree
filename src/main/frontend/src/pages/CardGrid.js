import React, { useEffect, useState } from "react";
import "../styles/CardGrid.css"; // Import your custom styles
import axios from "axios"; // Import Axios for API requests

const CardGrid = ({ sortOption }) => {
  const [boards, setBoards] = useState([]); // State for boards
  const [sortedItems, setSortedItems] = useState([]); // State for sorted boards
  const [error, setError] = useState(null); // State for error handling

  // Fetch boards from the backend
  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/boards"); // Fetch data from backend
      setBoards(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching boards:", error);
      setError("Failed to fetch board data");
    }
  };

  // Fetch boards when the component mounts
  useEffect(() => {
    fetchBoards(); // Fetch boards when the component mounts
  }, []);

  // Sort the boards whenever sortOption or boards data changes
  useEffect(() => {
    sortItems(sortOption); // Sort boards whenever sortOption or boards change
  }, [boards, sortOption]);

  // Sort the boards based on the selected sort option
  const sortItems = (option) => {
    let sorted = [...boards]; // Create a copy of the boards array

    // Sorting logic based on the selected option
    if (option === "인기순") {
      sorted.sort((a, b) => b.point - a.point); // Sort by points (descending)
    } else if (option === "낮은 포인트 순") {
      sorted.sort((a, b) => a.point - b.point); // Sort by points (ascending)
    } else if (option === "높은 활동점수 순") {
      sorted.sort((a, b) => b.score - a.score); // Sort by score (descending)
    }

    setSortedItems(sorted); // Set sorted items in state
  };

  return (
      <div className="grid-container">
        {error && <p>{error}</p>} {/* Display error if it occurs */}
        {sortedItems.length > 0 ? (
            sortedItems.map((item) => (
                <div key={item.id} className="grid-item">
                  <div className="image-placeholder">
                    <img src={item.imgUrl} className="image-placeholder" alt="Talent"/>
                  </div>
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>{item.point} 포인트</p>
                    {/*<p>{item.score} 점</p>*/}
                  </div>
                </div>
            ))
        ) : (
            <p>게시물이 없습니다.</p> // Message when no items are available
        )}
      </div>
  );
};

export default CardGrid;
