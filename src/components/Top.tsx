import React from "react";
import styled from "styled-components";
import { GrLinkTop } from "react-icons/gr";

const TopWrapper = styled.section`
  z-index: 9;
  cursor: pointer;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  bottom: 3rem;
  background-color: ${(props) => props.theme.color};
  right: 2.5rem;
  transition: 0.25s filter, 0.25s transform;
  &:hover {
    filter: brightness(95%);
    transform: scale(1.04);
  }
  svg {
    path {
      stroke: ${(props) => props.theme.bgColor};
    }
  }
`;

const Top = () => {
  const onTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <TopWrapper onClick={onTop}>
      <GrLinkTop size={24} />
    </TopWrapper>
  );
};

export default Top;
