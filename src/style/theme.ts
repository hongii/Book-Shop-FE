export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "secondary" | "third" | "background";
export type HeadingSize = "large" | "medium" | "small";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#222",
    secondary: "blue",
    third: "green",
    background: "lightgray",
  },
  heading: {
    large: { fontSize: "2rem" },
    medium: { fontSize: "1.5rem" },
    small: { fontSize: "1rem" },
  },
};

export const dark: Theme = {
  ...light,
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
