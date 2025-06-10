import { Link } from "react-router-dom";
import { SettingsIcon } from "../icons/SettingsIcon";

import { Theme } from "./Theme";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useCheckAuth, useSignout } from "../hooks/useAuthQueries";
import { NotesIcon } from "../icons/NotesIcon";

const listStyles =
  "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-300 cursor-pointer font-sans rounded-lg flex gap-3 items-center p-2";

const listPStyles = "text-[15px] hidden sm:inline ";

export const Sidebar = () => {
  const { data: authUser } = useCheckAuth();
  const { mutate: signout } = useSignout();

  function handleSignout() {
    signout();
  }

  return (
    <aside className="h-screen fixed border-r dark:border-zinc-700 border-zinc-200 sm:w-50 py-5 px-2 bg-white dark:bg-zinc-800 flex flex-col justify-between">
      <div>
        <Link to="/" className={listStyles}>
          <NotesIcon className="size-6" />
          <p className={listPStyles}>{authUser.firstName}'s notes</p>
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        <li>
          <Theme text={"Theme"} className="gap-3" />
        </li>
        <li>
          <Link to="/settings" className={listStyles}>
            <SettingsIcon />
            <p className={listPStyles}>Settings</p>
          </Link>
        </li>

        <li>
          <Link
            to="/login"
            className={`${listStyles} `}
            onClick={handleSignout}
          >
            <LogoutIcon />
            <p className={listPStyles}>Logout</p>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
