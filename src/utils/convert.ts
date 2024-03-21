import { SearchBooksParams } from "@/api/aladin.api";

export const convertParamsToQueryString = (params: SearchBooksParams) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
