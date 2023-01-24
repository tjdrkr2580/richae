import React from "react";
import styled from "styled-components";
import { GrLinkTop } from "react-icons/gr";

const TopWrapper = styled.section`
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
