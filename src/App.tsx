import { BookShopThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookShopThemeProvider>
        <RouterProvider router={router} />
      </BookShopThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
