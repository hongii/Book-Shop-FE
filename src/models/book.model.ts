interface Pagination {
  totalBooks: number;
  currentPage: number;
}

export interface Book {
  id: number;
  title: string;
  categoryId: number;
  categoryName: string;
  pages: number;
  summary: string;
  author: string;
  price: number;
  publishedDate: string;
  imgUrl: string;
  likes: number;
  form: string;
  isbn: string;
  detail: string; // 포맷
  contents: string; // 목차
  pagination?: Pagination;
}

export interface BookDetail extends Book {
  isLiked: boolean;
}
