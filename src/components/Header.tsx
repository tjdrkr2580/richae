import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { darkmode } from "@utils/atom";
import { GoSearch } from "react-icons/go";

const HeaderFixedWrapper = styled.header`
  z-index: 999;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 6.5rem;
  background-color: ${(props) => props.theme.bgColor};
`;

const HeaderWrapper = styled.section`
  width: 90vw;
  margin: 0 auto;
  max-width: 80rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 0.25rem solid ${(props) => props.theme.color};

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
  gap: 4rem;
  align-items: center;
  li {
    a {
      cursor: pointer;
      font-size: 1.6rem;
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
    window.localStorage.setItem("Richae-Darkmode", String(!darkmodeState));
  };
  return (
    <HeaderFixedWrapper>
      <HeaderWrapper>
        <Link to="/">
          <h1>Richae</h1>
        </Link>

        <HeaderList>
          <li className="toggleMode" onClick={onToggleMode}>
            {darkmodeState ? <BsSunFill size={22} /> : <BsMoonFill size={20} />}
          </li>
          <li>
            <Link to="/search">
              <GoSearch size={20} />
            </Link>
          </li>
        </HeaderList>
      </HeaderWrapper>
    </HeaderFixedWrapper>
  );
};

export default Header;
