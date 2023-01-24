import EtfList from "@components/EtfList";
import React from "react";
import styled from "styled-components";

const HomeWraaper = styled.section`
  width: 95vw;
  max-width: 102.4rem;
  margin: 10rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Desc = styled.ul`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  li {
    width: 25rem;
    list-style: circle;
    font-size: 1.25rem;
  }
`;

const Home = () => {
  return (
    <HomeWraaper>
      {/* <Desc></Desc> */}
      <EtfList />
    </HomeWraaper>
  );
};

export default Home;
