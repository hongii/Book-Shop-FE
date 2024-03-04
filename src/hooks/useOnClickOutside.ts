import React, { useEffect } from "react";

const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current !== null && !ref.current.contains(event.target as HTMLDivElement)) {
        handler();
      }
    };
    document.addEventListener("click", listener as EventListener);
    document.addEventListener("touchstart", listener as EventListener);

    return () => {
      document.removeEventListener("click", listener as EventListener);
      document.removeEventListener("touchstart", listener as EventListener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
