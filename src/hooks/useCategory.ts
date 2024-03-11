import { Category } from "@/models/category.model";
import { useCallback } from "react";
import { fetchCategory } from "@/api/category.api";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";

export const useCategory = () => {
  const location = useLocation();
  const setActive = useCallback(
    (fetchData: Category[]) => {
      const allCategories = [{ categoryId: null, categoryName: "전체" }, ...fetchData];
      const params = new URLSearchParams(location.search);
      const id = params.get("category_id");

      return allCategories.map((item) => {
        if (id) {
          return {
            ...item,
            isActive: +id === item.categoryId ? true : false,
          };
        } else {
          return {
            ...item,
            isActive: item.categoryId === null ? true : false,
          };
        }
      });
    },
    [location.search],
  );

  const { data: fetchCategories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [queryKey.categories],
    queryFn: fetchCategory,
    select: (data) => setActive(data?.categories),
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return { categories: fetchCategories, isCategoriesLoading };
};
