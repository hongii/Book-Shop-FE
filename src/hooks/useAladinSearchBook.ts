import { fetchSearch } from "@/api/aladin.api";
import { queryKey } from "@/constants/queryKey";
import { MAXRESULTS } from "@/constants/querystring";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useAladinSearchBook = (keyword: string | null) => {
  const {
    data: searchBooksResult,
    isLoading: isSearchBooksLoading,
    isFetching: isSearchBooksFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey.searchBooks, keyword],
    queryFn: ({ pageParam = 1 }) => fetchSearch(keyword, pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = Math.ceil(lastPage.pagination.totalBooks / MAXRESULTS);
      return currentPage < totalPages ? currentPage + 1 : null;
    },
    initialPageParam: 1,
  });

  const books =
    searchBooksResult?.pages[0].pagination.totalBooks !== 0
      ? searchBooksResult?.pages.flatMap((page) => page.books)
      : [];

  return {
    searchBooks: books,
    isSearchBooksLoading,
    isSearchBooksFetching,
    fetchNextPage,
    hasNextPage,
    totalBooks: searchBooksResult?.pages[0].pagination.totalBooks,
  };
};
