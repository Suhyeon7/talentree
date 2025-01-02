// src/components/selectBox.js
import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  padding: 0px;
  border-radius: 10px;
  border: 1px solid #436850;
  outline: none;
  font-size: 12px;
  width: 110px;
  height: 33px;
  text-align: center;
  &:focus {
    border-color: #436850;
  }
  cursor: pointer;
`;

const SelectBox = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("인기순");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e.target.value); // 선택된 값을 상위 컴포넌트로 전달
  };

  return (
    <SelectContainer>
      <StyledSelect id="sortSelect" value={selectedOption} onChange={handleSelectChange}>
        <option value="인기순">인기순</option>
        <option value="낮은 포인트 순">낮은 포인트 순</option>
        <option value="높은 활동점수 순">높은 활동점수 순</option>
      </StyledSelect>
    </SelectContainer>
  );
};

export default SelectBox;
