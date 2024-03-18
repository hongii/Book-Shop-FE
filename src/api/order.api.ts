import { Order, OrderDetail, OrderList } from "@/models/order.model";
import { httpClient } from "@/api/http";

export const requestOrder = async (orderData: Order) => {
  try {
    const { data } = await httpClient.post("/orders", orderData);
    return data;
  } catch (err) {
    throw err;
  }
};

export interface OrderListResult {
  orders: OrderList[];
  message: string | null;
}

export const fetchOrderList = async () => {
  try {
    const { data } = await httpClient.get<OrderListResult>("/orders");
    return data;
  } catch (err) {
    throw err;
  }
};

export interface OrderDetailResult {
  orderDetail: OrderDetail[];
}

export const fetchOrderDetail = async (orderId: number) => {
  try {
    const { data } = await httpClient.get<OrderDetailResult>(`/orders/${orderId}`);
    return data;
  } catch (err) {
    throw err;
  }
};
