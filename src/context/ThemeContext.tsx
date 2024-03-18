import { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeName, getTheme } from "@/style/theme";
import { GlobalStyle } from "@/style/global";
import { ThemeProvider } from "styled-components";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_shop_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

const state: State = {
  themeName: DEFAULT_THEME_NAME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const BookShopThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const selectdThemeName = themeName === "light" ? "dark" : "light";
    setThemeName(selectdThemeName);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, selectdThemeName);
  };

  useEffect(() => {
    const selectedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
    setThemeName(selectedThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
