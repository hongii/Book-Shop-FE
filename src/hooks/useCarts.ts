import { fetchAllCart, requestDeletedCartItem } from "@/api/carts.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";
import { useCartStore } from "@/store/cartStore";

export const useCarts = () => {
  const { updateCartItemsCount } = useCartStore();
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

  return {
    carts: carts?.items,
    isEmpty: carts?.items.length === 0,
    message: carts?.message,
    isCartsLoading,
    deletedCartItem,
  };
};
