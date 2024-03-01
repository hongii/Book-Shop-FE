import { Pagination } from "./../models/pagination.model";
import { Book } from "../models/book.model";
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

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const { data } = await httpClient.get<FetchBooksResponse>("/books", { params });
    return data;
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
