import { fetchBookList } from "@/api/aladin.api";
import { fetchReviewsAll } from "@/api/review.api";
import { AladinBook } from "@/models/aladinBook.model";
import { BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react";

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<AladinBook[]>([]);
  const [bestBooks, setBestBooks] = useState<AladinBook[]>([]);

  useEffect(() => {
    fetchReviewsAll().then((reviews) => {
      setReviews(reviews);
    });

    fetchBookList("ItemNewSpecial", null, 1, 10).then((booksData) => {
      setNewBooks(booksData);
    });

    fetchBookList("Bestseller", null, 1, 10).then((booksData) => {
      setBestBooks(booksData);
    });
  }, []);

  return { reviews, newBooks, bestBooks };
};
