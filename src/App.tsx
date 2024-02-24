import { BookShopThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";

function App() {
  return (
    <BookShopThemeProvider>
      <RouterProvider router={router} />
    </BookShopThemeProvider>
  );
}

export default App;
