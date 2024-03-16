import { Pagination } from "./../models/pagination.model";
import { Book, BookDetail } from "../models/book.model";
import { httpClient } from "./http";

export interface FetchBooksParams {
  category_id?: number;
  new?: boolean;
  page: number;
  limit: number;
}

export interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
  message: string | null;
}

export interface FetchToggleBookLike {
  likes: number;
  message: string;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const res = await httpClient.get<FetchBooksResponse>("/books", { params });
    return res.data;
  } catch (err: any) {
    console.error(err.response.data);
    return {
      books: [],
      pagination: {
        totalBooks: 0,
        page: 1,
      },
      message: "조회 가능한 도서가 없습니다.",
    };
  }
};

export const fetchDetailBooks = async (bookId: string) => {
  try {
    const res = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const toggleLikeBook = async (bookId: number) => {
  try {
    const res = await httpClient.post<FetchToggleBookLike>(`/likes/${bookId}`);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const fetchBestBooks = async () => {
  try {
    const res = await httpClient.get<Book[]>(`/books/best`);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
