export type ThemeName = "light" | "dark";
export type ColorKey =
  | "primary"
  | "secondary"
  | "third"
  | "background"
  | "backgroundRGBA"
  | "border"
  | "text"
  | "inputText"
  | "themeIconColor"
  | "authIconColor"
  | "toastColor";
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
  borderShadow: {
    itemShadow: string;
    listShadow: string;
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
    secondary: "#666",
    third: "#D5204A",
    background: "#F4C6C6",
    backgroundRGBA: "rgba(227, 227, 227, 0.8)",
    border: "#e3e3e3",
    text: "#231F20",
    inputText: "#231F20",
    themeIconColor: "#FA6607",
    authIconColor: "#5b5b5b",
    toastColor: "#d9d2e9",
  },
  heading: {
    large: { fontSize: "2.5rem" },
    medium: { fontSize: "1.75rem" },
    small: { fontSize: "1.5rem" },
  },
  buttonSize: {
    large: { fontSize: "1.5rem", padding: "1rem 2rem" },
    medium: { fontSize: "1.25rem", padding: "0.5rem 1.5rem" },
    small: { fontSize: "1rem", padding: "0.25rem 0.5rem" },
  },
  buttonScheme: {
    primary: { color: "#231F20", backgroundColor: "#F4C6C6" },
    normal: { color: "#231F20", backgroundColor: "#e3e3e3" },
  },
  borderRadius: {
    default: "4px",
  },
  borderShadow: {
    itemShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
    listShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
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
    primary: "#e3e3e3",
    secondary: "#ececec",
    third: "#0CAFCD",
    background: "#383838",
    backgroundRGBA: "rgba(153, 153, 153, 0.8)",
    border: "#e0e0e0",
    text: "#ffffff",
    inputText: "#231F20",
    themeIconColor: "#4799e2",
    authIconColor: "#ececec",
    toastColor: "#0a4981",
  },
  buttonScheme: {
    primary: { color: "#231F20", backgroundColor: "#e3e3e3" },
    normal: { color: "#e3e3e3", backgroundColor: "#383838" },
  },
  borderShadow: {
    itemShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
    listShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
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
