import { useEffect, useState } from "react";
import { fetchAllCart, requestDeletedCartItem } from "../api/carts.api";
import { Cart } from "../models/cart.model";

export const useCarts = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>("");

  const deletedCartItem = async (cartId: number) => {
    await requestDeletedCartItem(cartId);
    setCarts((prev) => prev.filter((item) => item.cartItemId !== cartId));
    setIsEmpty(carts.length === 0);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const { items, message } = await fetchAllCart();
      setCarts(items);
      setIsEmpty(items.length === 0);
      setMessage(message);
    };
    fetchCartData();
  }, []);

  return { carts, isEmpty, message, deletedCartItem };
};
