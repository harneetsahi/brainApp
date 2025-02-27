import { Button } from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "./CreateContentModal";
import { useState } from "react";

export const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center py-10">
        <CreateContentModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <h1 className="font-sans font-bold text-xl">All Notes</h1>

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
            onClick={() => setModalOpen(true)}
          />
        </div>
      </header>
    </>
  );
};
