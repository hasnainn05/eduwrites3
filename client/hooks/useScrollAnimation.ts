import { useEffect, useRef } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animate-in class to trigger animation
            entry.target.classList.add("animate-in");
            // Optionally stop observing this element after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    // Get all elements with scroll-animate classes
    const animatedElements = container.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade"
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [threshold]);

  return containerRef;
}
