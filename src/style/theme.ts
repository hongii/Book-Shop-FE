export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "secondary" | "third" | "background" | "border" | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  buttonSize: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#222",
    secondary: "blue",
    third: "green",
    background: "lightgray",
    border: "grey",
    text: "black",
  },
  heading: {
    large: { fontSize: "2rem" },
    medium: { fontSize: "1.5rem" },
    small: { fontSize: "1rem" },
  },
  buttonSize: {
    large: { fontSize: "1.5rem", padding: "1rem 2rem" },
    medium: { fontSize: "1rem", padding: "0.5rem 1.5rem" },
    small: { fontSize: "0.75rem", padding: "0.25rem 0.5rem" },
  },
  buttonScheme: {
    // 확인 버튼
    primary: { color: "white", backgroundColor: "midnightblue" },
    // 취소 버튼
    normal: { color: "black", backgroundColor: "lightgray" },
  },
  borderRadius: {
    default: "4px",
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
    border: "grey",
    text: "black",
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
