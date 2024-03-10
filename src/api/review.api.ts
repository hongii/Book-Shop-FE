import { httpClient } from "@/api/http";
import { BookReviewItem } from "@/models/book.model";

export const fetchBookReview = async (bookId: string) => {
  return await httpClient.get<BookReviewItem>(`/reviews/${bookId}`);
};
