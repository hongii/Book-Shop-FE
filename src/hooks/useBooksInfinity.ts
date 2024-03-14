import { useLocation } from "react-router-dom";
import { fetchBooks } from "@/api/books.api";
import { LIMIT, QUERYSTRING } from "@/constants/querystring";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";

export const useBooksInfinity = () => {
  const location = useLocation();

  const getBooks = async ({ pageParam }: { pageParam: number }) => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      category_id: searchParams.get(QUERYSTRING.CATEGORY_ID)
        ? Number(searchParams.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      new: searchParams.get(QUERYSTRING.NEW) ? true : undefined,
      page: pageParam,
      limit: LIMIT,
    };

    return await fetchBooks(params);
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryKey.books, location.search],
    queryFn: ({ pageParam = 1 }) => getBooks({ pageParam }),
    getNextPageParam: (lastPage) => {
      const isLastPage =
        lastPage.pagination.totalBooks === 0 ||
        Math.ceil(lastPage.pagination.totalBooks / LIMIT) === lastPage.pagination.page;
      return isLastPage ? null : lastPage.pagination.page + 1;
    },
    initialPageParam: 1,
  });

  const books = data?.pages[0].books.length ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data?.pages[0].books.length
    ? data.pages[data.pages.length - 1].pagination
    : {};
  const isEmpty = books.length === 0;
  const message = data ? data.pages[data.pages.length - 1].message : null;
  return {
    books,
    pagination,
    isEmpty,
    message,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
