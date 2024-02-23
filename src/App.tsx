import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { BookShopThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BookShopThemeProvider>
      <ThemeSwitcher />
      <Layout children={<HomePage />} />
    </BookShopThemeProvider>
  );
}

export default App;
