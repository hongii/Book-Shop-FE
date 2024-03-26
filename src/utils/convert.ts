import { BookDetailParmas, BookListParams } from "@/api/aladin.api";

export const convertParamsToQueryString = (params: BookListParams | BookDetailParmas) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
