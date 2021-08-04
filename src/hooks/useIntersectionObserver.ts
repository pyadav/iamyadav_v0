import { useState, useEffect, useRef } from "react";

function useIntersectionObserver(
  items: any,
  rootMargin: string,
  threshold: number,
) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  let observer = useRef<any>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1)
            setActiveNode(entry.target.getAttribute("id"));
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    items.forEach((item: string) => {
      if (item !== "#") {
        let target = document.querySelector(item);
        if (target) observer.current.observe(target);
      }
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [activeNode, items, rootMargin, threshold]);

  return [activeNode];
}

export default useIntersectionObserver;
