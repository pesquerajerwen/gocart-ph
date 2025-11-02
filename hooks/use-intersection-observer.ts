import { useEffect, useRef } from "react";

type UseIntersectionObserverOptions = {
  /** Called when the target element becomes visible */
  onIntersect: () => void;
  /** Whether to enable the observer */
  enabled?: boolean;
  /** Intersection threshold (0–1, or array of values) */
  threshold?: number | number[];
  /** Root margin (e.g. "0px 0px 100px 0px") */
  rootMargin?: string;
};

export default function useIntersectionObserver({
  onIntersect,
  enabled = true,
  threshold = 0.5,
  rootMargin = "0px",
}: UseIntersectionObserverOptions) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) onIntersect();
      },
      { root: null, threshold, rootMargin }
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [onIntersect, enabled, threshold, rootMargin]);

  return { ref };
}
