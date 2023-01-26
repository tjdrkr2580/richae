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
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DetailWrapper = styled.section`
  width: 90vw;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .notice {
    @media (min-width: 374px) and (max-width: 375px) {
      margin-top: 5rem;
    }
    font-size: 1.45rem;
  }
`;

const ChartWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 20rem;
`;

const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0 auto;
  @media (max-width: 413px) {
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
      }
    }
    .price {
      font-size: 3rem;
      font-weight: 700;
    }
  }
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  h1 {
    font-size: 2.5rem;
  }
  .desc {
    display: flex;
    flex-direction: column;
    p {
      width: 35vw;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* 라인수 */
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      font-size: 1.2rem;
    }
  }
  .price {
    font-size: 3.5rem;
    font-weight: 700;
  }
`;

const DetailInfoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    gap: 1rem;
    .previous-different {
      display: flex;
      align-items: center;
      .price {
        font-size: 1.45rem;
        font-weight: 700;
        margin-right: 0.5rem;
      }
    }
  }
`;

const TableWrapper = styled.table``;

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
  const [priceInfo, setPriceInfo] = useState<any>(undefined);
  const [detail, setDetail] = useState<any>(undefined); //나중에 지정
  const { isLoading, isError } = useQuery(
    "fetching-detail-data",
    async () => {
      const priceInfoFetching = await axios.get(
        `https://api.twelvedata.com/quote?symbol=${id}&apikey=${process.env.REACT_APP_API_KEY}`
      );
      const dateFetching = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${id}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.REACT_APP_API_POLYGON_KEY}`
      );
      let num: number = dateFetching.data.results.length;
      const dateMap = await dateFetching.data.results.map(
        (prices: any, index: number) => {
          let text: number | string = num + " day ago";
          num -= 1;
          return [text, prices.c];
        }
      );
      setDetail(dateMap);
      setPriceInfo(priceInfoFetching.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const options: Highcharts.Options = {
    legend: {
      enabled: false,
    },
    yAxis: [
      {
        gridLineWidth: 0,
        gridLineColor: "transparent",
        title: { text: null },
        lineWidth: 0,
        labels: {
          enabled: false,
        },
      },
    ],
    xAxis: {
      labels: {
        enabled: false,
      },
      tickColor: "transparent",
      gridLineColor: "transparent",
      lineColor: "transparent",
      categories: undefined,
    },
    title: {
      text: "",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    colors: ["#0082e2"],
    chart: {
      height: 200,
      backgroundColor: "transparent",
    },
    series: [
      {
        type: "spline",
        name: "A week's closing price",
        data: detail,
      },
    ],
    tooltip: {
      enabled: true,
      headerFormat: "",
      pointFormat: "{point.name} : $ {point.y: point.y,.2f}",
    },
    credits: {
      enabled: false,
    },
  };
  if (detail !== undefined) console.log(priceInfo, detail);
  return (
    <DetailWrapper>
      {detail === undefined ? (
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
        <>
          <span className="notice">Stock Data as of {priceInfo?.datetime}</span>
          <DetailHeader>
            <img src={Logo} alt="Stock Logo" />
            <div className="desc">
              <h1>{priceInfo?.symbol}</h1>
              <p>{priceInfo?.name}</p>
            </div>
            <span className="price">
              ${parseFloat(priceInfo?.close).toFixed(2)}
            </span>
          </DetailHeader>
          <ChartWrapper>
            <HighchartsReact
              containerProps={{ className: "home_body-chart" }}
              highcharts={Highcharts}
              options={options}
            />
          </ChartWrapper>
          <DetailInfoWrapper>
            <li>
              Difference from before:
              <div className="previous-different">
                <span className="price">
                  ${parseFloat(detail[detail?.length - 2][1]).toFixed(2)}
                </span>
                {priceInfo?.change < 0 ? (
                  <span className="minus">
                    {parseFloat(priceInfo?.change).toFixed(2)}%
                  </span>
                ) : (
                  <span className="plus">
                    +{parseFloat(priceInfo?.change).toFixed(2)}%
                  </span>
                )}
              </div>
            </li>
          </DetailInfoWrapper>
          <TableWrapper></TableWrapper>
        </>
      )}
    </DetailWrapper>
  );
};

export default Detail;
