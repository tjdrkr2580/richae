import { etfList } from "@utils/atom";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const EtfListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const EtfList = () => {
  const [etfState, setEtfState] = useRecoilState(etfList);
  const { isLoading } = useQuery(
    "fetching-etf-data",
    async () => {
      if (etfState === undefined) {
        const etfList = await axios.get("https://api.twelvedata.com/etf", {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        });
        setEtfState(etfList.data.data);
        console.log("작동");
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 2000,
    }
  );
  return <EtfListWrapper></EtfListWrapper>;
};

export default EtfList;
