import { etfList } from "@utils/atom";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const EtfListWrapper = styled.ul`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EtfListForm = styled.li`
  cursor: pointer;
  height: 7.25rem;
  align-items: center;
  border: 0.15rem solid ${(props) => props.theme.color};
  display: flex;
  padding-left: 1rem;
  border-radius: 1rem;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  h1 {
    font-size: 1.5rem;
    width: 100%;
  }
  p {
    font-size: 1.4rem;
    width: 100%;
  }
  transition: 0.25s filter, 0.25s transform;
  &:hover {
    filter: brightness(90%);
    transform: scale(1.04);
  }
`;

//

const EtfList = () => {
  const [etfState, setEtfState] = useRecoilState(etfList);
  const { isLoading } = useQuery(
    "fetching-etf-data",
    async () => {
      if (etfState === undefined) {
        const etfList = await axios.get(
          "https://api.twelvedata.com/etf?country=United States&exchange=NASDAQ",
          {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setEtfState(etfList.data.data.slice(0, 150));
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 2000,
    }
  );
  console.log(etfState);
  return (
    <EtfListWrapper>
      {isLoading === false
        ? etfState?.map((etf, index) => (
            <EtfListForm key={index}>
              <h1>{etf.symbol}</h1>
              <p>{etf.name}</p>
            </EtfListForm>
          ))
        : null}
    </EtfListWrapper>
  );
};

export default EtfList;
