import React from "react";
import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";

const FooterWrapper = styled.footer`
  padding: 1rem 0;
  height: 4rem;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  span {
    padding-left: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <a
        href="https://github.com/tjdrkr2580/richae"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithubSquare size={25} />
      </a>
      <span>ⓒ Taeh | Twelvedata, Polygon, Finnhub API </span>
    </FooterWrapper>
  );
};

export default Footer;
