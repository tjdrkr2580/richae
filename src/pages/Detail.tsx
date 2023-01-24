import { detailType } from "@utils/type";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Logo from "@utils/assets/logo.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRecoilValue } from "recoil";
import { darkmode } from "@utils/atom";

const DetailWrapper = styled.section`
  width: 90vw;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
  }
  h1 {
    font-size: 3rem;
  }
  .desc {
    display: flex;
    flex-direction: column;
    p {
      width: 21rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* 라인수 */
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      font-size: 1.25rem;
    }
  }
  .price {
    font-size: 3.5rem;
    font-weight: 700;
  }
`;

const Detail = () => {
  const darkmodeState = useRecoilValue(darkmode);
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() - 1;
  let toDate =
    year +
    "-" +
    ("00" + month.toString()).slice(-2) +
    "-" +
    ("00" + day.toString()).slice(-2);
  let fromDate =
    year +
    "-" +
    ("00" + month.toString()).slice(-2) +
    "-" +
    ("00" + (day - 10)).slice(-2);
  const { id } = useParams();
  const [dateRange, setDateRange] = useState(undefined);
  const [detail, setDetail] = useState<any>(undefined);
  const [yesDetail, setYesDetail] = useState<undefined | detailType>(undefined);
  const { isLoading, isError } = useQuery(
    "fetching-detail-data",
    async () => {
      const rangeFetching = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${id}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=120&apiKey=zbd1YPIQqlJFRipVDQU1bRm3DMYrifM_`
      );
      const detailFetching = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${id}?apiKey=zbd1YPIQqlJFRipVDQU1bRm3DMYrifM_`
      );
      const yesDetailFetching = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${id}/prev?adjusted=true&apiKey=zbd1YPIQqlJFRipVDQU1bRm3DMYrifM_`
      );
      setYesDetail(yesDetailFetching.data);
      setDateRange(rangeFetching.data);
      setDetail(detailFetching.data.results);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (yesDetail !== undefined) console.log(yesDetail, dateRange, detail);
  return (
    <DetailWrapper>
      {isLoading ? (
        darkmodeState ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton
                width={300}
                count={20}
                height={72.5}
                style={{ marginBottom: "2rem", borderRadius: "1rem" }}
              />
            </p>
          </SkeletonTheme>
        ) : (
          <Skeleton
            count={20}
            width={300}
            height={72.5}
            style={{ marginBottom: "2rem", borderRadius: "1rem" }}
          />
        )
      ) : (
        <DetailHeader>
          <img src={Logo} alt="Stock Logo" />
          <div className="desc">
            <h1>{yesDetail?.ticker}</h1>
            <p>{detail?.name}</p>
          </div>
          <span className="price">${yesDetail?.results[0].c}</span>
        </DetailHeader>
      )}
    </DetailWrapper>
  );
};

export default Detail;
