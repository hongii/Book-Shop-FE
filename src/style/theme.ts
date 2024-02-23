export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "secondary" | "third" | "background";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#222",
    secondary: "blue",
    third: "green",
    background: "lightgray",
  },
};

export const dark: Theme = {
  name: "dark",
  color: {
    primary: "coral",
    secondary: "darkblue",
    third: "darkgreen",
    background: "midnightblue",
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
