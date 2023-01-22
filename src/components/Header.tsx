import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { darkmode } from "@utils/atom";

const HeaderFixedWrapper = styled.header`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 6rem;
`;

const HeaderWrapper = styled.section`
  width: 90vw;
  margin: 0 auto;
  max-width: 80rem;
  height: 100%;
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    cursor: pointer;
    font-family: "Zilla Slab", serif;
    font-size: 4rem;
    color: ${(props) => props.theme.primary};
    filter: brightness(85%);
  }
`;

const HeaderList = styled.ul`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  li {
    a {
      cursor: pointer;
      font-size: 1.9rem;
    }
  }
  .toggleMode {
    cursor: pointer;
    transition: 0.2s color;
    &:hover {
      color: yellow;
    }
  }
`;

const Header = () => {
  const [darkmodeState, setDarkmode] = useRecoilState(darkmode);
  const onToggleMode = () => {
    setDarkmode(!darkmodeState);
  };
  return (
    <HeaderFixedWrapper>
      <HeaderWrapper>
        <h1>Richae</h1>
        <HeaderList>
          <li>
            <Link to="/">Focus on KR</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li className="toggleMode" onClick={onToggleMode}>
            {darkmodeState ? <BsSunFill size={22} /> : <BsMoonFill size={20} />}
          </li>
        </HeaderList>
      </HeaderWrapper>
    </HeaderFixedWrapper>
  );
};

export default Header;
