import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface CardProps {
  title: string;
  type: "twitter" | "youtube" | "other";
  link: string;
}

const ButtonSpanStyle =
  "cursor-pointer hover:text-gray-700 hover:dark:text-gray-300 p-2 rounded-md";

export const Card = ({ title, type, link }: CardProps) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-zinc-800 max-w-72 p-5 shadow-sm shadow-gray-600  rounded-lg flex flex-col gap-5">
        <CardHeader title={title} type={type} link={link} />
        <CardDescription title={title} type={type} link={link} />
        <CardTags />
      </div>
    </>
  );
};

const CardHeader = ({ title }: CardProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2>{title}</h2>
      <div className="flex gap-3 text-gray-800 dark:text-gray-500  ">
        <span className={ButtonSpanStyle}>
          <ShareIcon size={"md"} />
        </span>
        <span className={ButtonSpanStyle}>
          <TrashIcon size={"md"} />
        </span>
      </div>
    </div>
  );
};

const CardDescription = ({ type, link }: CardProps) => {
  return (
    <>
      <div className="h-50 overflow-scroll ">
        {type === "twitter" && (
          <blockquote className="twitter-tweet ">
            <a href={link.replace("x", "twitter")}></a>
          </blockquote>
        )}

        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link.replace("watch?v=", "embed/")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </>
  );
};

const CardTags = () => {
  return (
    <>
      <div> # Tags</div>
    </>
  );
};
