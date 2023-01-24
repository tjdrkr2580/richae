export type etfType = {
  country: string;
  currency: string;
  exchange: string;
  mic_code: string;
  name: string;
  symbol: string;
};

export type detailResultType = {
  c: string;
  h: string;
  l: string;
  n: string;
  o: string;
  t: string;
  v: string;
  vw: string;
};

export type detailType = {
  adjusted: boolean;
  count: number;
  queryCount: number;
  request_id: string;
  results: detailResultType[];
  resultsCount: number;
  status: string;
  ticker: string;
};
