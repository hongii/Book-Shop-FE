import { useLocation } from "react-router-dom";
import { fetchBooks } from "@/api/books.api";
import { LIMIT, QUERYSTRING } from "@/constants/querystring";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = {
    category_id: searchParams.get(QUERYSTRING.CATEGORY_ID)
      ? Number(searchParams.get(QUERYSTRING.CATEGORY_ID))
      : undefined,
    new: searchParams.get(QUERYSTRING.NEW) ? true : undefined,
    page: searchParams.get(QUERYSTRING.PAGE) ? Number(searchParams.get(QUERYSTRING.PAGE)) : 1,
    limit: LIMIT,
  };

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ["books", location.search],
    queryFn: () => fetchBooks(params),
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    message: booksData?.message,
    isBooksLoading,
  };
};
