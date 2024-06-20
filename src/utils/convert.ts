import { BookDetailParams, BookListParams, SearchBookParams } from "@/api/aladin.api";

export const convertParamsToQueryString = (
  params: BookListParams | BookDetailParams | SearchBookParams,
) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
