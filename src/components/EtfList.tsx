import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const EtfList = () => {
  const { isLoading } = useQuery("fetching-etf-data", async () => {
    await axios
      .get("https://api.twelvedata.com/etf", {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => console.log(response.data.data));
  });
  return <div>{isLoading ? "loading.." : "success.."}</div>;
};

export default EtfList;
