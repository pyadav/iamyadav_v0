import { useState, useEffect } from "react";
import clsx from "clsx";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";

export function Toc() {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll("[data-toc]"),
    );
    setHeadings(headingElements);
  }, []);

  const [activeNode] = useIntersectionObserver(
    ["#introduction", ...headings.map((heading) => `#${heading.id}`)],
    `0% 0% -55% 0%`,
    1,
  );

  // Function to determine the Heading Level based on `nodeName` (H2, H3, etc)
  const getLevel = (nodeName: string) => {
    return Number(nodeName.replace("H", ""));
  };

  return (
    <nav className="toc text-fore-subtle">
      <h2 className="mb-2 font-normal text-accent tracking-widestest">
        TABLE OF CONTENTS
      </h2>

      {headings.map((heading) => {
        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              "block mt-3 text-sm hover:text-purple-700 dark:hover:text-yellow-700 focus-visible:outline-accent",
              {
                "text-purple-700": heading.id === activeNode,
                "dark:text-yellow-700": heading.id === activeNode,
                "ml-3": getLevel(heading.nodeName) === 3,
              },
            )}
          >
            {heading.innerText}
          </a>
        );
      })}
    </nav>
  );
}
