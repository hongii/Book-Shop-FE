import { useState } from "react";
import { fetchDetailBooks, toggleLikeBook } from "@/api/books.api";
import { addToCartParams, requestAddToCart } from "@/api/carts.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";
import { fetchBookReview } from "@/api/review.api";

export const useBookDetail = (bookId: string | undefined) => {
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);

  const { data: bookDetail, isLoading: isBookDetailLoading } = useQuery({
    queryKey: [queryKey.bookDetail, bookId],
    queryFn: () => (bookId && Number(bookId) ? fetchDetailBooks(bookId) : Promise.resolve(null)),
  });

  const { data: bookReview, isLoading: isBookReviewLoading } = useQuery({
    queryKey: [queryKey.bookReview, bookId],
    queryFn: () => (bookId ? fetchBookReview(bookId) : Promise.resolve(null)),
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: ({ bookId, quantity }: addToCartParams) => requestAddToCart({ bookId, quantity }),
    onSuccess: () => {
      setIsAddToCart(true);
      setTimeout(() => {
        setIsAddToCart(false);
      }, 3000);
    },
  });

  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (bookId: number) => {
      const { likes, message } = await toggleLikeBook(bookId);
      return { likes, message };
    },
    onSuccess: ({ likes, message }) => {
      if (bookDetail) {
        const updatedBookDetail = {
          ...bookDetail,
          likes: likes,
          isLiked: message === "liked",
        };
        queryClient.setQueryData([queryKey.bookDetail, bookId], updatedBookDetail);
      }
    },
  });

  return {
    bookDetail,
    isBookDetailLoading,
    toggleLike,
    addToCart,
    isAddToCart,
    bookReview,
    isBookReviewLoading,
  };
};
