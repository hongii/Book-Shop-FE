import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";
import { fetchBookList } from "@/api/aladin.api";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "@/constants/querystring";
import { MAXRESULTS } from "@/constants/querystring";

export const useAladinBooks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get(QUERYSTRING.CATEGORY_ID);
  const isNew =
    searchParams.get(QUERYSTRING.NEW) === "true" ? "ItemNewSpecial" : "ItemEditorChoice";
  const queryType = categoryId === null && isNew === "ItemEditorChoice" ? "Bestseller" : isNew;

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey.aladinBooks, categoryId, isNew],
    queryFn: ({ pageParam = 1 }) => fetchBookList(queryType, categoryId, pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = Math.ceil(lastPage.pagination.totalBooks / MAXRESULTS);
      return currentPage < totalPages ? currentPage + 1 : null;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 18,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const books =
    data?.pages[0].pagination.totalBooks !== 0 ? data?.pages.flatMap((page) => page.books) : [];
  const isEmpty = !books || books.length === 0;

  return {
    aladinBooks: books,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isEmpty,
  };
};
