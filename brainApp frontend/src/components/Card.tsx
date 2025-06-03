import toast from "react-hot-toast";
import { LinkIcon } from "../icons/LinkIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { IContent } from "../store_and_types/types";
import { useEffect, useRef, useState } from "react";
import { PaintIcon } from "../icons/PaintIcon";
import { CircleIcon } from "../icons/Circle";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ButtonSpanStyle =
  "cursor-pointer rounded-md py-1 hover:-translate-y-0.5 transition-all  ";

const colorOptions = [
  { bg: "olive", text: "#ffffff" },
  { bg: "#ffcccc", text: "#000000" },
  { bg: "#a4eb34", text: "#000000" },
  { bg: "floralWhite", text: "#000000" },
  { bg: "goldenRod", text: "#ffffff" },
  { bg: "khaki", text: "#000000" },
  { bg: "salmon", text: "#330000" },
  { bg: "#252527", text: "#ffffff" },
  { bg: "#cc5200", text: "#ffffff" },
  { bg: "#0059b3", text: "#ffffff" },
];

export const Card = ({
  title,
  link,
  description,
  _id: id,
  onDelete,
}: IContent) => {
  const colorPickerRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [cardColor, setCardColor] = useState(() => {
    const savedColor = localStorage.getItem(`cardColor-${id}`);

    try {
      return savedColor
        ? JSON.parse(savedColor)
        : { bg: "khaki", text: "#330000" };
    } catch (error) {
      return { bg: "khaki", text: "#330000" };
    }
  });

  useEffect(() => {
    localStorage.setItem(`cardColor-${id}`, JSON.stringify(cardColor));
  }, [cardColor, id]);

  const handleColorChange = (bgColor: string, textColor: string) => {
    setCardColor({ bg: bgColor, text: textColor });
  };

  const handleLink = async () => {
    await navigator.clipboard.writeText(`${link}`);
    toast.success("Link copied");
  };

  function handleClickOutside() {
    setShowColorPicker(false);
  }

  useOutsideClick(colorPickerRef, handleClickOutside);

  return (
    <>
      <article
        id={id}
        style={{
          backgroundColor: cardColor["bg"],
          color: cardColor["text"],
        }}
        className={` sm:w-72 w-65 p-5 shadow-sm dark:shadow-zinc-800/50  shadow-gray-300  rounded-lg flex flex-col gap-5 relative text-zinc-800  `}
      >
        <div className="flex justify-between items-center relative">
          <h2 className="text-md sm:text-lg">{title}</h2>
          <div className="flex gap-3 sca ">
            <button
              className={`${ButtonSpanStyle}    `}
              onClick={() => setShowColorPicker((prev) => !prev)}
              title="Click to change notes colour"
              ref={colorPickerRef}
            >
              <PaintIcon size="size-4.5" />
            </button>

            {/*  */}
            {showColorPicker && (
              <div className="absolute top-6 -right-5 dark:bg-zinc-800 bg-zinc-50 border-1 dark:border-zinc-700 border-zinc-200 p-2 rounded-lg flex gap-2">
                {colorOptions.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleColorChange(color.bg, color.text);
                      // setShowColorPicker(false);
                    }}
                    className="cursor-pointer"
                  >
                    <CircleIcon color={color["bg"]} size="size-5" />
                  </button>
                ))}
              </div>
            )}

            {/*  */}
            {link && (
              <button
                className={`${ButtonSpanStyle}  `}
                onClick={handleLink}
                title="Click to copy link"
              >
                <LinkIcon />
              </button>
            )}
            <button
              className={`${ButtonSpanStyle} hover:text-red-600   `}
              onClick={onDelete}
              title="Click to delete post"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <p className="text-sm">{description}</p>
      </article>
    </>
  );
};
