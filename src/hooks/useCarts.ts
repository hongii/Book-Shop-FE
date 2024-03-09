import { fetchAllCart, requestDeletedCartItem } from "@/api/carts.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";

export const useCarts = () => {
  const { data: carts, isLoading: isCartsLoading } = useQuery({
    queryKey: [queryKey.carts],
    queryFn: fetchAllCart,
  });

  const queryClient = useQueryClient();

  const { mutate: deletedCartItem } = useMutation({
    mutationFn: (cartId: number) => requestDeletedCartItem(cartId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey.carts] }),
  });

  return {
    carts: carts?.items,
    isEmpty: carts?.items.length === 0,
    message: carts?.message,
    isCartsLoading,
    deletedCartItem,
  };
};
