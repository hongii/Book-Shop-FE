interface CartItem {
  cartItemId: string;
  bookId: string;
  quantity: number;
}

interface Delivery {
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
