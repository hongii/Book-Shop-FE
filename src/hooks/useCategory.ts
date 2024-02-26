import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((results) => {
      if (!results) return;

      const allCategories = [{ categoryId: null, categoryName: "전체" }, ...results.categories];
      setCategory(allCategories);
    });
  }, []);
  return { category };
};
