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

export interface OrderList extends Order {
  orderId: number;
  createdAt: string;
}

export interface OrderDetail {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  imgUrl: string;
  form: string;
}

export interface OrderListDetail extends OrderList {
  detail?: OrderDetail[];
}
