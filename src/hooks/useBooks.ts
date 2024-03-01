import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { FetchBooksResponse, fetchBooks } from "../api/books.api";
import { LIMIT, QUERYSTRING } from "../constants/querystring";

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ totalBooks: 0, page: 1 });
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      category_id: searchParams.get(QUERYSTRING.CATEGORY_ID)
        ? Number(searchParams.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      new: searchParams.get(QUERYSTRING.NEW) ? true : undefined,
      page: searchParams.get(QUERYSTRING.PAGE) ? Number(searchParams.get(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    };

    fetchBooks(params).then((res: FetchBooksResponse) => {
      const { books, pagination, message } = res;
      setBooks(books);
      setPagination(pagination);
      setIsEmpty(books.length === 0);
      setMessage(message);
    });
  }, [location.search]);

  return { books, pagination, isEmpty, message };
};
