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

const Home = () => {
  return (
    <HomeWraaper>
      <EtfList />
    </HomeWraaper>
  );
};

export default Home;
