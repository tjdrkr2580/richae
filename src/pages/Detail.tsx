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
    margin-top: 5rem;
    @media (min-width: 374px) and (max-width: 375px) {
      margin-top: 7.5rem;
    }
    font-size: 1.45rem;
  }
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: circle;
  gap: 0.7rem;
  li {
    font-weight: 500;
    font-size: 1.2rem;
    &:first-child {
      padding-top: 0.6rem;
    }
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
      object-fit: fill;
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
    width: 6rem;
    height: 6rem;
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
        margin-right: 0.5rem;
      }
    }
  }
`;

const TableWrapper = styled.table`
  margin-top: 3rem;
  width: 95%;
  th {
    height: 3rem;
    font-size: 1.3rem;
    &:first-child {
      background-color: ${(props) => props.theme.svg};
    }
    &:nth-child(2) {
      width: 20%;
    }
  }
  td {
    padding: 0.8rem 0.8rem;
    font-size: 1.3rem;
    height: 2rem;
    &:nth-child(2) {
      background-color: ${(props) => props.theme.svg};
    }
    .minus {
      font-size: 1.3rem;
    }
    .plus {
      font-size: 1.3rem;
    }
  }
`;

const RowSpantd = styled.td`
  text-align: center;
  font-weight: 500;
  font-size: 1.45rem !important;
`;

const ChapterText = styled.h1`
  margin: 1rem 0;
  width: 100%;
  font-size: 2.5rem;
  font-weight: 500;
  padding-left: 1.5rem;
  align-self: flex-start;
`;

const ErrorText = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  padding-left: 1.5rem;
`;

const NewsWrapper = styled.ul`
  width: 90%;
  display: flex;
  overflow-y: auto;
  height: 25rem;
  gap: 1rem;
  padding-left: 1rem;
  align-items: center;
  background-color: transparent;
`;

const News = styled.li`
  cursor: pointer;
  transition: 0.25s filter;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  min-width: 19rem;
  max-width: 20rem;
  height: 22rem;
  background-color: ${(props) => props.theme.svg};
  padding: 0.3rem 0.3rem;
  img {
    margin-bottom: 0.5rem;
    align-self: center;
    object-fit: fill;
    width: 99%;
    height: 12rem;
  }
  span {
    padding-left: 0.45rem;
    font-size: 1.3rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .source {
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }
  p {
    padding-left: 0.45rem;
    width: 98%;
    font-size: 1.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  &:hover {
    filter: brightness(90%);
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
  const [priceInfo, setPriceInfo] = useState<any>(undefined);
  const [closes, setCloses] = useState<any>(undefined); //나중에 지정
  const [datePrice, setDatePrice] = useState<any>(undefined);
  const [news, setNews] = useState<any>(undefined);
  const [detail, setDetail] = useState<any>(undefined);
  const { isLoading, isError } = useQuery(
    //개선사항 적용할 것
    "fetching-detail-data",
    async () => {
      const priceInfoFetching = await axios.get(
        `https://api.twelvedata.com/quote?symbol=${id}&apikey=${process.env.REACT_APP_API_KEY}`
      );
      const dateFetching = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${id}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.REACT_APP_API_POLYGON_KEY}`
      );
      const newsFetching = await axios.get(
        `https://finnhub.io/api/v1/company-news?symbol=${id}&from=${fromDate}&to=${toDate}&token=${process.env.REACT_APP_API_FINNHUB}`
      );
      const detailFetching = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${id}&token=${process.env.REACT_APP_API_FINNHUB}`
      );
      let num: any = dateFetching?.data?.results?.length;
      const dateMap = await dateFetching?.data.results.map(
        (prices: any, index: number) => {
          let text: number | string = num + " day ago";
          num -= 1;
          return [text, prices.c];
        }
      );
      setDatePrice(dateFetching.data);
      setCloses(dateMap);
      setPriceInfo(priceInfoFetching.data);
      setNews(newsFetching.data);
      setDetail(detailFetching.data);
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
        data: closes,
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
    accessibility: {
      enabled: false,
    },
  };
  return (
    <DetailWrapper>
      {news === undefined || isError === true ? (
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
            <img
              src={detail?.logo === undefined ? Logo : detail?.logo}
              alt="Stock Logo"
            />
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
                  $
                  {datePrice.results[datePrice?.results.length - 1].c.toFixed(
                    2
                  )}
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
            {detail?.ipo ? (
              <InfoList>
                <li>IPO : {detail?.ipo ? detail?.ipo : "-"}</li>
                <li>Name : {detail?.name ? detail?.name : "-"}</li>
                <li>
                  FinnhubIndustry :{" "}
                  {detail?.finnhubIndustry === "N/A"
                    ? "-"
                    : detail?.finnhubIndustry}
                </li>
                <li>Exchange : {detail?.exchange ? detail?.exchange : "-"}</li>
                <li>
                  MarketCap : ${" "}
                  {detail?.marketCapitalization
                    ? detail?.marketCapitalization
                    : "-"}
                </li>
              </InfoList>
            ) : null}
          </DetailInfoWrapper>
          <TableWrapper>
            <thead>
              <tr>
                <th>Name</th>
                <th>Sub</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <RowSpantd rowSpan={2}>Common</RowSpantd>
                <td>Currency</td>
                <td>{priceInfo?.currency}</td>
              </tr>
              <tr>
                <td>Market_open</td>
                <td>{priceInfo?.is_market_open ? "Open" : "Close"}</td>
              </tr>
              <tr>
                <RowSpantd rowSpan={2}>Yesterday</RowSpantd>
                <td>High</td>
                <td>
                  $
                  {datePrice?.results[datePrice?.results.length - 1].h.toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <td>Low</td>
                <td>
                  $
                  {datePrice?.results[datePrice?.results.length - 1].l.toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <RowSpantd rowSpan={4}>52-Weeks</RowSpantd>
                <td>High</td>
                <td>
                  ${parseFloat(priceInfo?.fifty_two_week.high).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Low</td>
                <td>${parseFloat(priceInfo?.fifty_two_week.low).toFixed(2)}</td>
              </tr>
              <tr>
                <td>High cp</td>
                <td>
                  {priceInfo?.fifty_two_week.high_change_percent > 0 ? (
                    <span className="plus">
                      +
                      {parseFloat(
                        priceInfo?.fifty_two_week.high_change_percent
                      ).toFixed(2)}
                      %
                    </span>
                  ) : (
                    <span className="minus">
                      {parseFloat(
                        priceInfo?.fifty_two_week.high_change_percent
                      ).toFixed(2)}
                      %
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Low cp</td>
                <td>
                  {priceInfo?.fifty_two_week.low_change_percent > 0 ? (
                    <span className="plus">
                      +
                      {parseFloat(
                        priceInfo?.fifty_two_week.low_change_percent
                      ).toFixed(2)}
                      %
                    </span>
                  ) : (
                    <span className="minus">
                      {parseFloat(
                        priceInfo?.fifty_two_week.low_change_percent
                      ).toFixed(2)}
                      %
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </>
      )}
      {news === undefined ? null : <ChapterText>Week News</ChapterText>}
      {news?.length !== 0 ? (
        <NewsWrapper>
          {news?.map((news: any, index: number) => (
            <a href={news.url} key={index} target="_blank" rel="noreferrer">
              <News>
                <img src={!news.image ? Logo : news.image} alt="news-img" />
                <span>{news.headline}</span>
                <p>{news.summary}</p>
                <span className="source">{news.source}</span>
              </News>
            </a>
          ))}
        </NewsWrapper>
      ) : null}
      {news?.length === 0 ? (
        <ErrorText>News from the last week doesn't exist.</ErrorText>
      ) : null}
    </DetailWrapper>
  );
};

export default Detail;
