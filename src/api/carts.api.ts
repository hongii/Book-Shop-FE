import { Cart } from "@/models/cart.model";
import { httpClient } from "@/api/http";
import { AladinBookDetail } from "@/models/aladinBook.model";

export interface addToCartParams {
  bookId: number;
  quantity: number;
  info: AladinBookDetail;
}

export const requestAddToCart = async (params: addToCartParams) => {
  try {
    const { data } = await httpClient.post("/carts", params);
    return data;
  } catch (err: any) {
    throw err;
  }
};

export interface FetchAllCartResponse {
  items: Cart[];
  message: string | null;
}

export const fetchAllCart = async () => {
  try {
    const res = await httpClient.get<FetchAllCartResponse>("/carts");
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const requestDeletedCartItem = async (cartItemId: number) => {
  try {
    const res = await httpClient.delete(`/carts/${cartItemId}`);
    return res;
  } catch (err: any) {
    throw err;
  }
};

export const requestChangeQuantity = async (cartItemId: number, quantity: number) => {
  try {
    const { data } = await httpClient.put(`/carts/${cartItemId}`, { quantity });
    return data;
  } catch (err: any) {
    throw err;
  }
};
