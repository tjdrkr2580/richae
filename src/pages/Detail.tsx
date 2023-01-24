import { detailType } from "@utils/type";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Detail = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() - 1;
  let nowDate =
    year +
    "-" +
    ("00" + month.toString()).slice(-2) +
    "-" +
    ("00" + day.toString()).slice(-2);
  const { id } = useParams();
  const [detail, setDetail] = useState<undefined | detailType>(undefined);
  const { isLoading } = useQuery(
    "fetching-detail-data",
    async () => {
      const detailFetching = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${id}/range/1/day/${nowDate}/${nowDate}?adjusted=true&sort=asc&limit=120&apiKey=zbd1YPIQqlJFRipVDQU1bRm3DMYrifM_`
      );
      setDetail(detailFetching.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (detail !== undefined) console.log(detail);
  return <div>Detail</div>;
};

export default Detail;
