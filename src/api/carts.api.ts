import { httpClient } from "./http";

interface addToCartParams {
  bookId: number;
  quantity: number;
}

export const requestAddToCart = async (params: addToCartParams) => {
  try {
    const { data } = await httpClient.post("/carts", params);
    return data;
  } catch (err: any) {
    throw err;
  }
};
