import { Button } from "./Button";
import { ShareIcon } from "../icons/ShareIcon";
import { useRef, useState } from "react";
import { ShareContentModal } from "./ShareContentModal";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const Header = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareBtnRef = useRef(null);

  function handleClickOutside() {
    setShareModalOpen(false);
  }

  useOutsideClick(shareBtnRef, handleClickOutside);

  function handleShareModal() {
    setShareModalOpen((prev) => !prev);
  }

  return (
    <>
      <header className="flex justify-center  pt-10 pb-12  relative sm:mx-5">
        <h1 className=" text-2xl " style={{ fontFamily: "Italiana" }}>
          KeepNote
        </h1>

        <div ref={shareBtnRef} className="absolute right-0" title="Share notes">
          <Button
            variant={"iconBtn"}
            text={"Share Notes"}
            size={"sm"}
            startIcon={<ShareIcon size="size-4" />}
            className="flex gap-2 items-center h-9"
            onClick={handleShareModal}
          />
        </div>

        <ShareContentModal
          isOpen={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
          }}
        />
      </header>
    </>
  );
};
