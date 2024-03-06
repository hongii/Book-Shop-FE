import { createBrowserRouter } from "react-router-dom";
import Error from "../components/common/Error";
import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";
import JoinPage from "../pages/JoinPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import LoginPage from "../pages/LoginPage";
import BooksPage from "../pages/BooksPage";
import BookDetailPage from "../pages/BookDetailPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/join",
    element: (
      <Layout>
        <JoinPage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/reset",
    element: (
      <Layout>
        <ResetPasswordPage />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <BooksPage />
      </Layout>
    ),
  },
  {
    path: "/books/:bookId",
    element: (
      <Layout>
        <BookDetailPage />
      </Layout>
    ),
  },
  {
    path: "/carts",
    element: (
      <Layout>
        <CartPage />
      </Layout>
    ),
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <OrderPage />
      </Layout>
    ),
  },
]);
