import { fetchBookList } from "@/api/aladin.api";
import { fetchBanners } from "@/api/banner.api";
import { fetchReviewsAll } from "@/api/review.api";
import { AladinBook } from "@/models/aladinBook.model";
import { Banner } from "@/models/banner.model";
import { BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react";

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<AladinBook[]>([]);
  const [bestBooks, setBestBooks] = useState<AladinBook[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchReviewsAll().then((reviews) => {
      setReviews(reviews);
    });

    fetchBookList("ItemNewSpecial", null, 1, "10").then((booksData) => {
      setNewBooks(booksData);
    });

    fetchBookList("Bestseller", null, 1, "10").then((booksData) => {
      setBestBooks(booksData);
    });

    fetchBanners().then((banners) => {
      setBanners(banners);
    });
  }, []);

  return { reviews, newBooks, bestBooks, banners };
};
