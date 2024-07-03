import { Navigate, createBrowserRouter } from "react-router-dom";
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
import SearchPage from "@/pages/SearchPage";

interface Props {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const ErrorLayoutWrapper = () => (
  <Layout>
    <Error />
  </Layout>
);

const preRouterList = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/join",
    element: (
      <PublicRoute>
        <JoinPage />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/reset",
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
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
    path: "/books/search",
    element: <SearchPage />,
  },
  {
    path: "/carts",
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <OrderPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/orderlist",
    element: (
      <PrivateRoute>
        <OrderListPage />
      </PrivateRoute>
    ),
  },
];

const routerList = preRouterList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <ErrorLayoutWrapper />,
  };
});

export const router = createBrowserRouter(routerList);
