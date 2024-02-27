import { createBrowserRouter } from "react-router-dom";
import Error from "../components/common/Error";
import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";
import JoinPage from "../pages/JoinPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import LoginPage from "../pages/LoginPage";

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
    path: "/books",
    element: (
      <Layout>
        <div>도서 목록 페이지</div>
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
]);
