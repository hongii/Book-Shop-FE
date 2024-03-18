import { useEffect, useState } from "react";
import { getTheme } from "@/style/theme";

const MOBILE_MEDIA_QUERY = getTheme("light").mediaQuery.mobile;

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia(MOBILE_MEDIA_QUERY).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return { isMobile };
};
