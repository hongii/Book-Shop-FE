import {
  FetchAllCartResponse,
  fetchAllCart,
  requestChangeQuantity,
  requestDeletedCartItem,
} from "@/api/carts.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";
import { useCartStore } from "@/store/cartStore";
import { Cart } from "@/models/cart.model";
import { useToast } from "./useToast";

export const useCarts = () => {
  const { updateCartItemsCount } = useCartStore();
  const { showToast } = useToast();
  const { data: carts, isLoading: isCartsLoading } = useQuery({
    queryKey: [queryKey.carts],
    queryFn: fetchAllCart,
  });

  const queryClient = useQueryClient();

  const { mutate: deletedCartItem } = useMutation({
    mutationFn: (cartId: number) => requestDeletedCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.carts] });
      if (carts) updateCartItemsCount(carts.items.length);
    },
  });

  const { mutate: changeQuantity } = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      requestChangeQuantity(cartItemId, quantity),
    onSuccess: (data, variables) => {
      const previousCarts: FetchAllCartResponse | undefined = queryClient.getQueryData([
        queryKey.carts,
      ]);

      if (previousCarts) {
        const updatedCartsItems = previousCarts.items.map((item: Cart) =>
          item.cartItemId === variables.cartItemId
            ? { ...item, quantity: variables.quantity }
            : item,
        );

        const updatedCarts = {
          items: updatedCartsItems,
        };

        queryClient.setQueryData([queryKey.carts], updatedCarts);
        updateCartItemsCount(updatedCarts.items.length);
      }

      queryClient.invalidateQueries({ queryKey: [queryKey.carts] });
      showToast(data.message);
    },
  });

  return {
    carts: carts?.items,
    isEmpty: carts?.items.length === 0,
    message: carts?.message,
    isCartsLoading,
    deletedCartItem,
    changeQuantity,
  };
};
