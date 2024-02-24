import { createBrowserRouter } from "react-router-dom";
import Error from "../components/common/Error";
import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";

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
]);
