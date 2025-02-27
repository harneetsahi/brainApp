import { DocIcon } from "../icons/DocIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { MoonIcon } from "../icons/MoonIcon";
// import { MenuIcon } from "../icons/MenuIcon";
import { SettingsIcon } from "../icons/Settings";
import { SunIcon } from "../icons/SunIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { SidebarItems } from "./SidebarItems";

const defaultItemContainerStyles = "flex flex-col cursor-pointer";

// const darkModeStyles =

export const Sidebar = () => {
  return (
    <>
      {/* <button className="hover:bg-gray-400 dark:hover:bg-gray-200 rounded-lg cursor-pointer p-2 h-10 text-gray-800 dark:text-gray-600">
        <MenuIcon size={"lg"} />
      </button> */}
      <aside
        // id="default-sidebar"
        className="min-h-screen fixed w-50 py-2 px-2 bg-white dark:bg-zinc-800 flex flex-col justify-between"
      >
        <div className={defaultItemContainerStyles}>
          <SidebarItems icon={<HomeIcon size={"md"} />} text={"Home"} />
          <SidebarItems icon={<DocIcon size={"md"} />} text={"Document"} />
        </div>
        <div className={defaultItemContainerStyles}>
          <SidebarItems icon={<MoonIcon size={"md"} />} text={"Dark"} />
          <SidebarItems icon={<SunIcon size={"md"} />} text={"Light"} />
          <SidebarItems icon={<SettingsIcon size={"md"} />} text={"Settings"} />
          <SidebarItems icon={<TrashIcon size={"md"} />} text={"Trash"} />
        </div>
      </aside>
    </>
  );
};
