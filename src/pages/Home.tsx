import EtfList from "@components/EtfList";
import React from "react";
import styled from "styled-components";

const HomeWraaper = styled.section`
  margin-top: -50rem;
`;

const Home = () => {
  return (
    <HomeWraaper>
      <EtfList />
    </HomeWraaper>
  );
};

export default Home;
