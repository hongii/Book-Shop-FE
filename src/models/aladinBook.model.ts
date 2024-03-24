export interface AladinBook {
  itemId: number;
  title: string;
  categoryId: number;
  categoryName: string;
  description: string;
  author: string;
  priceStandard: number;
  pubDate: string;
  cover: string;
  form: string;
  isbn13: string;
  publisher: string; // 출판사
}

export interface AladinBookDetail extends AladinBook {
  itemPage: number;
  ratingScore: number;
  ratingCount: number;
  myReviewCount: number;
  bestSellerRank?: string;
  isLiked?: boolean;
  likes?: number;
}
