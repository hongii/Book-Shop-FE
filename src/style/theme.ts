export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "secondary" | "third" | "background" | "border" | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal";
export type LayoutWidth = "large" | "medium" | "small";

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
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "#4e4e4e",
    secondary: "#311604",
    third: "black",
    background: "#F4C6C6",
    border: "#e2e2e2",
    text: "#231F20",
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
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};

export const dark: Theme = {
  ...light,
  name: "dark",
  color: {
    primary: "white",
    secondary: "darkblue",
    third: "darkgreen",
    background: "#F4C6C6",
    border: "#ececec",
    text: "#fff",
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
