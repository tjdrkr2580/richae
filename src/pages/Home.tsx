import EtfList from "@components/EtfList";
import React from "react";
import styled from "styled-components";

const Home = () => {
  const HomeWraaper = styled.section`
    margin-top: -50rem;
  `;
  return (
    <HomeWraaper>
      <EtfList />
    </HomeWraaper>
  );
};

export default Home;
