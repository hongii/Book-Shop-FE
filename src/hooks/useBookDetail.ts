import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchToggleBookLike, fetchDetailBooks, toggleLikeBook } from "../api/books.api";
import { BookDetail } from "../models/book.model";
import { useAuthStore } from "../store/authStore";
import { requestAddToCart } from "../api/carts.api";

export const useBookDetail = (bookId: string | undefined) => {
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const addToCart = async (quantity: number) => {
    if (!bookDetail) return;

    await requestAddToCart({ bookId: bookDetail.id, quantity });
    setIsAddToCart(true);
    setTimeout(() => {
      setIsAddToCart(false);
    }, 3000);
  };

  const toggleLike = () => {
    // 로그인하지 않은 사용자의 좋아요 버튼 클릭 시, 서버로 요청 보내지 않고 프론트에서 선처리
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 후 이용해주세요.")) {
        navigate("/login");
      }
      return;
    }

    if (!bookDetail) return;

    toggleLikeBook(bookDetail.id).then((res: FetchToggleBookLike) => {
      const { likes, message } = res;
      if (message === "liked") {
        setBookDetail({
          ...bookDetail,
          likes: likes,
          isLiked: true,
        });
      } else {
        setBookDetail({
          ...bookDetail,
          likes: likes,
          isLiked: false,
        });
      }
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchDetailBooks(bookId).then((res: BookDetail) => {
      setBookDetail(res);
    });
  }, [bookId]);
  return { bookDetail, toggleLike, addToCart, isAddToCart };
};
