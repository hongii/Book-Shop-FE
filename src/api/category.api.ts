import { Category } from "../models/category.model";
import { httpClient } from "./http";

interface ApiResponse {
  categories: Category[];
  message?: string;
}

export const fetchCategory = async () => {
  const res = await httpClient.get<ApiResponse>("/categories");
  return res.data;
};
