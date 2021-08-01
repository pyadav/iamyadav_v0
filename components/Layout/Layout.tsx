import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "react-dark-mode-toggle";
import { useTheme } from "next-themes";

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked: boolean) => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme("dark");
    else setTheme("light");
  };

  const isRoot = pathname === "/";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <header className={clsx("flex items-center justify-between ")}>
      <div className={"max-w-md"}>
        <SmallTitle />
      </div>
      {mounted && (
        <DarkModeToggle
          onChange={toggleDarkMode}
          checked={isDarkMode}
          size={isRoot ? 28 : 24}
        />
      )}
    </header>
  );
};

const LargeTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-3xl font-black leading-none text-black no-underline font-display",
          "sm:text-4xl",
          "dark:text-white",
        )}
      >
        Praveen Yadav&apos;s Blog
      </a>
    </Link>
  </h1>
);

const SmallTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-xl font-black text-black no-underline font-display",
          "dark:text-white",
        )}
      >
        Praveen Yadav&apos;s Blog
      </a>
    </Link>
  </h1>
);

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-4xl px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
