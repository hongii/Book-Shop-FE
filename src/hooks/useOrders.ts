import { useEffect, useState } from "react";
import { OrderListDetail } from "../models/order.model";
import { OrderListResult, fetchOrderDetail, fetchOrderList } from "../api/order.api";

export const useOrders = () => {
  const [orderList, setOrderList] = useState<OrderListDetail[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>();

  const getOrderDetail = async (orderId: number) => {
    // 이미 해당 주문번호에 대한 detail값을 fetch해온적이 있다면,
    // orderList의 detail속성에 정보가 담겨져 있을 것
    // => 따라서, 이미 존재하는 정보에 대한 중복 요청은 무시하도록 요청 방어 처리
    if (orderList.find((item) => item.orderId === orderId)?.detail) {
      setSelectedOrderId(orderId);
      return;
    }

    // 주문 detail 정보가 없는 경우 => 서버로 요청
    const { orderDetail: orderDetailRes } = await fetchOrderDetail(orderId);
    setSelectedOrderId(orderId);
    setOrderList((prev) => {
      return prev.map((item) => {
        return item.orderId === orderId ? { ...item, detail: orderDetailRes } : item;
      });
    });
  };

  useEffect(() => {
    fetchOrderList().then((data: OrderListResult) => {
      // console.log(data);
      const { orders, message } = data;
      setOrderList(orders);
    });
  }, []);

  return { orderList, selectedOrderId, getOrderDetail };
};
