import { LockIcon } from "../icons/LockIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { Button } from "./Button";
import { useShareNotes, useStopSharingNotes } from "../hooks/useContentQueries";

interface ShareContentModal {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareContentModal = ({ isOpen }: ShareContentModal) => {
  const { mutate: shareNotes } = useShareNotes();
  const { mutate: stopSharingNotes } = useStopSharingNotes();

  function handleSharing() {
    shareNotes();
  }

  function handleStopSharing() {
    stopSharingNotes();
  }

  return (
    <>
      {isOpen && (
        <div className="absolute right-0 top-16 dark:bg-zinc-800 bg-white border-1 dark:border-zinc-700 border-zinc-50 shadow-md flex flex-col items-start p-3 rounded-lg gap-3 text-zinc-700 ">
          <Button
            variant="tertiary"
            size="sm"
            startIcon={<LinkIcon />}
            text="Copy Public Link"
            className="hover:bg-zinc-100 dark:hover:bg-zinc-700/40 w-full flex gap-3 items-center "
            onClick={handleSharing}
          />
          <Button
            variant="tertiary"
            size="sm"
            startIcon={<LockIcon />}
            text="Stop Sharing"
            className="hover:bg-zinc-100 dark:hover:bg-zinc-700/40 w-full flex gap-3 items-center "
            onClick={handleStopSharing}
          />
        </div>
      )}
    </>
  );
};
