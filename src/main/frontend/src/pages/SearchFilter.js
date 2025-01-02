import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 불러오기
import "../styles/SearchFilter.css";

const FilterPage = () => {
  const [minPoint, setMinPoint] = useState(""); // 최소 포인트
  const [maxPoint, setMaxPoint] = useState(""); // 최대 포인트
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const navigate = useNavigate(); // useNavigate 사용

  // 취소 버튼 클릭 시 이전 페이지로 이동하는 함수
  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  // 필터 적용 버튼 클릭 시 호출될 함수
  const applyFilter = () => {
    const appliedMinPoint = minPoint === "" ? 0 : Number(minPoint); // 최소 포인트가 비어있으면 0으로 설정
    const appliedMaxPoint = maxPoint === "" ? 9999 : Number(maxPoint); // 최대 포인트가 비어있으면 9999로 설정

    // 최소값과 최대값 비교
    if (appliedMinPoint > appliedMaxPoint) {
      setErrorMessage("[!] 알맞은 값을 넣어주세요");
      return;
    }

    // 오류 없을 경우, 오류 메시지 지우기
    setErrorMessage("");

    // 필터링 로직 (백엔드와 연결하여 데이터를 필터링하거나 상태로 관리 가능)
    console.log(`Filtering posts with points between ${appliedMinPoint} and ${appliedMaxPoint}`);

    // 여기서 필터링된 결과를 표시하는 로직 추가 가능
  };

  // 입력값 변경 시 에러 메시지 상태 초기화 및 유효성 검사
  const handleMinPointChange = (e) => {
    setMinPoint(e.target.value);
    if (Number(e.target.value) <= Number(maxPoint)) {
      setErrorMessage(""); // 조건이 만족되면 에러 메시지 제거
    }
  };

  const handleMaxPointChange = (e) => {
    setMaxPoint(e.target.value);
    if (Number(minPoint) <= Number(e.target.value)) {
      setErrorMessage(""); // 조건이 만족되면 에러 메시지 제거
    }
  };

  // 입력값 초기화
  const resetFilter = () => {
    setMinPoint("");
    setMaxPoint("");
    setErrorMessage(""); // 오류 메시지도 초기화
  };

  return (
    <div className="filter-page">
      <div className="header">
        <button className="search-cancel-button" onClick={handleBack}>
          취소
        </button>
        <h2>필터</h2>
        <button className="reset-button" onClick={resetFilter}>
          초기화
        </button>
      </div>

      <div className="filter-body">
        <div className="point-range">
          <label>포인트 범위</label>
          <div className="point-inputs">
            <input
              type="number"
              value={minPoint}
              onChange={handleMinPointChange} // 값이 변경되면 에러 상태 체크
              placeholder="최소 포인트"
              className="point-input"
            />
            <span>~</span>
            <input
              type="number"
              value={maxPoint}
              onChange={handleMaxPointChange} // 값이 변경되면 에러 상태 체크
              placeholder="최대 포인트"
              className="point-input"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>

      <button
        className="apply-button"
        onClick={applyFilter}
        disabled={errorMessage !== ""} // 오류가 있으면 버튼 비활성화
      >
        필터 적용하기
      </button>
    </div>
  );
};

export default FilterPage;
