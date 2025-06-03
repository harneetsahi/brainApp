import { useRef, useState } from "react";
import { useDeleteContent, useGetContents } from "../hooks/useContentQueries";
import { LoaderIcon } from "../icons/LoaderIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { IContent } from "../store_and_types/types";

import { Card } from "./Card";
import { CreateContentModal } from "./CreateContentModal";
import { CrossIcon } from "../icons/CrossIcon";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export const HomeSection = () => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { data: contents, isError, isPending } = useGetContents();

  const { mutate: deleteContent } = useDeleteContent();

  function handleDelete(id: string) {
    deleteContent(id);
  }

  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        Draggable.create(".draggable-item", {
          type: "x,y",
          bounds: containerRef.current,
          edgeResistance: 0.8,
          cursor: "grab",
          activeCursor: "grabbing",
          inertia: true,
        });
      }
    },
    { scope: containerRef, dependencies: [contents] }
  );

  return (
    <>
      <div
        className={` dark:bg-zinc-800/50   bg-white  border-1 dark:border-zinc-700 border-zinc-50  flex justify-center sm:w-[40vw] w-66  mx-auto shadow-sm ${
          !postModalOpen ? "rounded-lg" : "rounded-t-lg"
        }`}
        onClick={() => setPostModalOpen((prev) => !prev)}
      >
        <button className="w-full flex justify-between items-center cursor-pointer py-3 px-5   ">
          Add a note...
          <span className=" ">
            {!postModalOpen && <PlusIcon size="size-4" />}
            {postModalOpen && <CrossIcon size="size-4" />}
          </span>
        </button>
      </div>

      <CreateContentModal
        isOpen={postModalOpen}
        onClose={() => {
          setPostModalOpen(false);
        }}
      />

      <section
        ref={containerRef}
        className="flex flex-wrap gap-7 mt-15 pb-20 xl:justify-normal justify-center relative"
      >
        {isPending && (
          <div className="flex justify-center mt-20 w-full">
            <LoaderIcon />
          </div>
        )}

        {isError && (
          <div className="flex justify-center mt-20 w-full text-lg ">
            Something went wrong! Please try again later.
          </div>
        )}

        {contents?.map((content: IContent) => (
          <div key={content._id} className="draggable-item relative">
            <Card
              _id={content._id}
              title={content.title}
              link={content.link}
              description={content.description}
              onDelete={() => handleDelete(content._id as string)}
            />
          </div>
        ))}
      </section>
    </>
  );
};
