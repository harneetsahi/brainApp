import { useForm } from "react-hook-form";
import { IContent } from "../types/types";
import { Button } from "./Button";
import { InputDiv } from "./InputDiv";
import { usePostContents } from "../hooks/useContentQueries";

interface CreateContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContentModal = ({ isOpen, onClose }: CreateContentProps) => {
  const { register, handleSubmit, reset } = useForm<IContent>({
    defaultValues: {
      title: "",
      link: "",
      description: "",
    },
  });

  const { mutate: postContent } = usePostContents();

  const addContent = (data: IContent) => {
    try {
      postContent(data);
      reset();
      onClose();
    } catch (error) {
      console.log("failed to post ", error);
    }
  };

  return (
    <>
      {isOpen && (
        <article className=" flex justify-center items-center">
          <form
            className={`py-5 dark:bg-zinc-800/50  bg-white shadow-sm dark:text-white text-zinc-800 sm:w-[40vw] w-66   px-5 flex flex-col gap:2  sm:text-md text-sm border-1 border-t-0 dark:border-zinc-700 border-zinc-50 ${
              isOpen ? "rounded-b-lg" : "rounded-lg"
            } `}
            onSubmit={handleSubmit(addContent)}
          >
            <InputDiv
              className="text-lg"
              placeholder={"Title"}
              name="title"
              register={register}
            />

            <InputDiv
              placeholder={"Link (optional)"}
              name="link"
              register={register}
              className=""
            />
            <InputDiv
              placeholder={"Note"}
              name="description"
              register={register}
            />

            <Button
              variant="tertiary"
              size="sm"
              text="Add"
              className="px-6 bg-zinc-100 dark:bg-zinc-800 shadow-xs border-1 dark:border-zinc-700/50 border-zinc-100 self-center mt-3"
            />
          </form>
        </article>
      )}
    </>
  );
};
