import { httpClient } from "@/api/http";
import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";

export const fetchBookReview = async (bookId: string) => {
  const { data } = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);
  return data;
};

export interface addBookReviewRequest {
  bookId: string;
  reviewData: BookReviewItemWrite;
}

export const addBookReview = async (bookId: string, reviewData: BookReviewItemWrite) => {
  const { data } = await httpClient.post(`/reviews/${bookId}`, reviewData);
  return data;
};
