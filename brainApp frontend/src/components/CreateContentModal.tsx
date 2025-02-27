import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { InputDiv } from "./InputComponent";

const labelStyle = "flex flex-col  text-gray-300 mb-1 capitalize";
const inputStyle =
  "w-full bg-gray-200 px-3 py-2.5 text-gray-800 rounded-lg mb-3 font-light ";

interface CreateContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContentModal = ({ isOpen, onClose }: CreateContentProps) => {
  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen bg-zinc-700/90 fixed top-0 left-0">
          <article className=" flex justify-center items-center h-full  ">
            <form
              className="bg-zinc-800 min-w-80 px-7 pt-4 pb-8 flex flex-col rounded-xl "
              action="#"
            >
              <a
                onClick={onClose}
                className="self-end cursor-pointer hover:bg-zinc-700 rounded-md p-1"
              >
                <CrossIcon size={"lg"} />
              </a>

              <InputDiv text={"title"} />

              <div>
                <label className={labelStyle} htmlFor="type">
                  type
                </label>
                <select name="selectedType" id="" className={inputStyle}>
                  <option selected value="">
                    Choose one :
                  </option>
                  <option value="twitter">Tweet</option>
                  <option value="youtube">Youtube video</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <InputDiv text={"link"} />
              <InputDiv text={"description"} />

              <div className=" self-center mt-3 ">
                <Button
                  variant="tertiary"
                  size="sm"
                  text="Add"
                  className={
                    "hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-100 "
                  }
                />
              </div>
            </form>
          </article>
        </div>
      )}
    </>
  );
};
