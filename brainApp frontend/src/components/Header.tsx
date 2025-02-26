import { Button } from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

export const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center p-5">
        <h1 className="font-sans font-bold text-xl text-gray-800">All Notes</h1>

        <div className="flex gap-2.5">
          <Button
            variant={"secondary"}
            text={"Share Brain"}
            size={"sm"}
            startIcon={<ShareIcon size={"md"} />}
          />
          <Button
            variant={"primary"}
            text={"Add Content"}
            size={"sm"}
            startIcon={<PlusIcon size={"md"} />}
          />
        </div>
      </header>
    </>
  );
};
