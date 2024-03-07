import { Order } from "../models/order.model";
import { httpClient } from "./http";

export const requestOrder = async (orderData: Order) => {
  try {
    const { data } = await httpClient.post("/orders", orderData);
    return data;
  } catch (err) {
    throw err;
  }
};
