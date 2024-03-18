import { Category } from "@/models/category.model";
import { httpClient } from "@/api/http";

interface CategoryResponse {
  categories: Category[];
  message?: string;
}

export const fetchCategory = async () => {
  const res = await httpClient.get<CategoryResponse>("/categories");
  return res.data;
};
