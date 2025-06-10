import { Link } from "react-router-dom";
import { NotesIcon } from "../icons/NotesIcon";
import { Theme } from "./Theme";

export function Navbar() {
  return (
    <>
      <div className="">
        <Link to="/" className="absolute top-8 left-8">
          <NotesIcon className="size-8  cursor-pointer " />
        </Link>
        <Theme className="w-max absolute top-7 right-8" size="size-5" />
      </div>
    </>
  );
}
