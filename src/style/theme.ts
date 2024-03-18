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
  | "toastColor"
  | "arrowBackgroundColor";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal";
export type LayoutWidth = "large" | "medium" | "small";
export type MediaQuery = "mobile" | "tablet" | "desktop";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in MediaQuery]: {
      [key in HeadingSize]: {
        fontSize: string;
      };
    };
  };
  buttonSize: {
    [key in MediaQuery]: {
      [key in HeadingSize]: {
        fontSize: string;
        padding: string;
      };
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
  mediaQuery: {
    [key in MediaQuery]: string;
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
    arrowBackgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  heading: {
    mobile: {
      large: { fontSize: "3.8rem" },
      medium: { fontSize: "3rem" },
      small: { fontSize: "2.2rem" },
    },
    tablet: {
      large: { fontSize: "3rem" },
      medium: { fontSize: "2.4rem" },
      small: { fontSize: "1.8rem" },
    },
    desktop: {
      large: { fontSize: "2.5rem" },
      medium: { fontSize: "2rem" },
      small: { fontSize: "1.5rem" },
    },
  },
  buttonSize: {
    mobile: {
      large: { fontSize: "2.5rem", padding: "1rem 2rem" },
      medium: { fontSize: "2.3rem", padding: "0.5rem 1.5rem" },
      small: { fontSize: "2.1rem", padding: "0.25rem 0.5rem" },
    },
    tablet: {
      large: { fontSize: "2rem", padding: "1rem 2rem" },
      medium: { fontSize: "1.8rem", padding: "0.5rem 1.5rem" },
      small: { fontSize: "1.6rem", padding: "0.25rem 0.5rem" },
    },
    desktop: {
      large: { fontSize: "1.5rem", padding: "1rem 2rem" },
      medium: { fontSize: "1.25rem", padding: "0.5rem 1.5rem" },
      small: { fontSize: "1rem", padding: "0.25rem 0.5rem" },
    },
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
  mediaQuery: {
    mobile: "(min-width: 0) and (max-width: 767px)", // 767px 이하
    tablet: "(min-width: 768px) and (max-width: 1023px)", // 1023px 이하
    desktop: "(min-width: 1024px)", // 1024px 이상
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
    arrowBackgroundColor: "rgba(111, 111, 111, 0.5)",
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
