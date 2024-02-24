export interface Cart {
  cartItemId: number;
  bookId: number;
  title: string;
  summary: string;
  price: number;
  quantity: number;
  imgUrl?: string;
}
