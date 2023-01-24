import { darkmode, etfList } from "@utils/atom";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  border-radius: 1rem;
  gap: 0.6rem;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  .etf-header {
    display: flex;
    gap: 1.5rem;
    width: 90%;
    align-items: center;
    h1 {
      color: ${(props) => props.theme.svg};
      font-size: 1.4rem;
    }
    span {
      font-size: 1.35rem;
    }
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    font-size: 1.4rem;
    width: 87.5%;
  }
  transition: 0.25s filter, 0.25s transform;
  &:hover {
    filter: brightness(90%);
    transform: scale(1.04);
  }
`;

const EtfList = () => {
  const [etfState, setEtfState] = useRecoilState(etfList);
  const darkmodeState = useRecoilValue(darkmode);
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
        setEtfState(etfList.data.data.slice(0, 200));
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 2000,
    }
  );
  return (
    <EtfListWrapper>
      {isLoading === false ? (
        etfState?.map((etf, index) => (
          <Link to={`/detail/${etf.symbol}`} key={index}>
            <EtfListForm>
              <div className="etf-header">
                <h1>{index + 1}</h1>
                <span>{etf.symbol}</span>
              </div>
              <p>{etf.name}</p>
            </EtfListForm>
          </Link>
        ))
      ) : (
        <>
          {darkmodeState ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <p>
                <Skeleton
                  count={20}
                  height={72.5}
                  style={{ marginBottom: "2rem", borderRadius: "1rem" }}
                />
              </p>
            </SkeletonTheme>
          ) : (
            <Skeleton
              count={20}
              height={72.5}
              style={{ marginBottom: "2rem", borderRadius: "1rem" }}
            />
          )}
        </>
      )}
    </EtfListWrapper>
  );
};

export default EtfList;
