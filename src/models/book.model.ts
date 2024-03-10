export interface Book {
  id: number;
  title: string;
  categoryId: number;
  pages: number;
  summary: string;
  author: string;
  price: number;
  publishedDate: string;
  imgUrl: string | number;
  likes: number;
  form: string;
  isbn: string;
  detail: string; // 포맷
  contents: string; // 목차
}

export interface BookDetail extends Book {
  isLiked: boolean;
  categoryName: string;
}

export interface BookReviewItem {
  id: number;
  userName: string;
  review: string;
  createdAt: string;
  score: number;
}
