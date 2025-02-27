import { useEffect, useState } from "react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export const Theme = ({ text }: { text: string }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.querySelector("html")?.classList.toggle("dark");
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex gap-3 items-center font-sans text-sm p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-300 "
      >
        {darkMode ? <SunIcon size={"md"} /> : <MoonIcon size={"md"} />}
        {text}
      </button>
    </>
  );
};
