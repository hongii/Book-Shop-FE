import { createBrowserRouter } from "react-router-dom";
import Error from "@/components/common/Error";
import HomePage from "@/pages/HomePage";
import Layout from "@/components/layout/Layout";
import JoinPage from "@/pages/JoinPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import LoginPage from "@/pages/LoginPage";
import BooksPage from "@/pages/BooksPage";
import BookDetailPage from "@/pages/BookDetailPage";
import CartPage from "@/pages/CartPage";
import OrderPage from "@/pages/OrderPage";
import OrderListPage from "@/pages/OrderList";

const preRouterList = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset",
    element: <ResetPasswordPage />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  {
    path: "/books/:bookId",
    element: <BookDetailPage />,
  },
  {
    path: "/carts",
    element: <CartPage />,
  },
  {
    path: "/orders",
    element: <OrderPage />,
  },
  {
    path: "/orderlist",
    element: <OrderListPage />,
  },
];

const routerList = preRouterList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  };
});

export const router = createBrowserRouter(routerList);
