import { ReactElement, useEffect, useState } from "react";

interface SidebarItemsProps {
  icon: ReactElement;
  text: String;
}

export const SidebarItems = ({ icon, text }: SidebarItemsProps) => {
  return (
    <>
      <div className="flex gap-3 items-center font-sans text-sm p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-300 ">
        {icon} {text}
      </div>
    </>
  );
};
