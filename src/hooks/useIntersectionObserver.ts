import { useEffect, useRef } from "react";

type CallBack = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = (callBack: CallBack, options?: ObserverOptions) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    const currentTarget = targetRef.current;
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [callBack, options]);

  return targetRef;
};
