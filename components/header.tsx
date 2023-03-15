"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Logo from "./logo";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "light") {
      return (
        <MoonIcon
          className="w-4 h-4 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    } else {
      return (
        <SunIcon
          className="w-4 h-4 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    }
  };

  if (!mounted) return <></>;
  return (
    <header className="h-15 dark:border-gray-700">
      <div className="container px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo />
        {toggleTheme()}
      </div>
    </header>
  );
};

export default Header;
