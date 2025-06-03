import { useEffect, useState } from "react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export const Theme = ({
  text,
  className,
  size,
}: {
  text?: string;
  className?: string;
  size?: string;
}) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    const htmlEl = document.documentElement;

    if (darkMode) {
      htmlEl.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlEl.classList.remove("dark");
      localStorage.setItem("theme", "");
    }
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`cursor-pointer flex  items-center font-sans  p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-300 w-full ${className} `}
      >
        {darkMode ? <SunIcon size={size} /> : <MoonIcon size={size} />}
        <p className="hidden sm:inline text-[15px]">{text}</p>
      </button>
    </>
  );
};
