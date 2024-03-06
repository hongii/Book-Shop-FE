export interface CartItem {
  cartItemId: number;
  bookId: number;
  quantity: number;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface Order {
  items: CartItem[];
  delivery: Delivery;
  mainBookTitle: string;
  totalPrice: number;
  totalQuantity: number;
}
